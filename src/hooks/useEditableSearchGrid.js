import React, { useState } from 'react';
import { gridExpandedSortedRowIdsSelector, useGridApiRef, GridSearchIcon } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Search from '../components/Search.js';

// Shared in-grid-search mechanics for a NORMAL MUI DataGrid, distilled from the hand-rolled copies in
// PurchaseLedgerSplitDebitCredit / CashbookTransaction (finance) and SalesOrder (sales). You keep your
// own <DataGrid> and spread these onto it:
//
//   const search = useEditableSearchGrid({ rows, setRows, columns, onRowChange, groupValidations });
//   <DataGrid
//       apiRef={search.apiRef}
//       columns={search.columns}
//       onCellKeyDown={search.handleCellKeyDown}
//       processRowUpdate={search.processRowUpdate}
//       sx={search.gridSx}
//       ... any other DataGrid prop ...
//   />
//   {search.searchDialogs}
//
// It makes NO API calls and uses NO redux — the consumer fetches (useGet), holds `rows`, does the
// code lookups in `onRowChange`, and supplies each search column's `searchResults`.
//
// A `type:'search'` column is an editable text cell with two ways to fill it:
//   - type a code you know and press Tab -> the edit commits in one press (processRowUpdate pads it and
//     fires onRowChange) and focus advances; the consumer's onRowChange does the direct lookup.
//   - press Enter (or click the cell's search icon) -> a modal <Search> opens, pre-seeded with what you
//     typed, to find the value by description.
//
// `groupValidations` colours cells: when a group's isValid(row) is false, every field in it gets the
// invalid class (yellow by default — see `gridSx`).

const DEFAULT_INVALID_CLASS = 'invalidCode';

const padCode = (value, width) => {
    if (!width || value == null) {
        return value;
    }

    const text = `${value}`;
    return text.length && text.length < width ? text.padStart(width, '0') : value;
};

function useEditableSearchGrid({
    rows = [],
    setRows,
    columns = [],
    getRowId = row => row.id,
    onRowChange,
    groupValidations = []
}) {
    const apiRef = useGridApiRef();
    const [searchDialog, setSearchDialog] = useState({ forRow: null, forColumn: null });
    const [searchTerm, setSearchTerm] = useState('');

    const searchColumns = columns.filter(c => c.type === 'search');

    const closeDialog = () => setSearchDialog({ forRow: null, forColumn: null });

    // The invalid class for a field, if any group validation covering it is currently failing.
    const invalidClassForField = (field, row) => {
        const failing = groupValidations.find(
            g =>
                g.fields.includes(field) &&
                typeof g.isValid === 'function' &&
                g.isValid(row) === false
        );
        return failing ? (failing.invalidClassName ?? DEFAULT_INVALID_CLASS) : '';
    };

    const searchRenderCell = params => (
        <>
            <GridSearchIcon
                style={{ cursor: 'pointer', marginRight: 4 }}
                onClick={() => {
                    setSearchTerm(`${params.value ?? ''}`);
                    setSearchDialog({ forRow: params.id, forColumn: params.field });
                }}
            />
            {params.value}
        </>
    );

    // Decorate each column: search columns get the icon renderer; every column's cellClassName merges
    // the caller's own class with the group-validation (invalid) class.
    const decoratedColumns = columns.map(c => {
        const withRenderer =
            c.type === 'search'
                ? {
                      ...c,
                      editable: c.editable ?? true,
                      renderCell: c.renderCell ?? searchRenderCell
                  }
                : c;

        return {
            ...withRenderer,
            cellClassName: params => {
                const own =
                    typeof c.cellClassName === 'function'
                        ? c.cellClassName(params)
                        : (c.cellClassName ?? '');
                return [own, invalidClassForField(c.field, params.row)].filter(Boolean).join(' ');
            }
        };
    });

    const handleCellKeyDown = (params, event) => {
        // Enter on a search cell opens the dialog, pre-seeded with whatever has been typed.
        if (event.keyCode === 13 && params.colDef.type === 'search') {
            const inputEl = apiRef.current
                .getCellElement(params.id, params.field)
                ?.querySelector('input');
            setSearchTerm(`${inputEl?.value ?? params.value ?? ''}`);
            setSearchDialog({ forRow: params.id, forColumn: params.field });
            apiRef.current.stopCellEditMode({
                id: params.id,
                field: params.field,
                ignoreModifications: true
            });
            event.preventDefault();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        // Forms-style Tab traversal (from SalesOrder): move to the next/previous cell, wrapping rows.
        const rowIds = gridExpandedSortedRowIdsSelector(apiRef.current.state);
        const visibleColumns = apiRef.current.getVisibleColumns();
        const current = {
            rowIndex: rowIds.findIndex(id => id === params.id),
            colIndex: apiRef.current.getColumnIndex(params.field)
        };

        const atLastCell =
            current.colIndex === visibleColumns.length - 1 &&
            current.rowIndex === rowIds.length - 1 &&
            !event.shiftKey;
        const atFirstCell = current.colIndex === 0 && current.rowIndex === 0 && event.shiftKey;
        if (atLastCell || atFirstCell) {
            return;
        }

        event.preventDefault();

        const next = { ...current };
        if (!event.shiftKey) {
            if (next.colIndex < visibleColumns.length - 1) {
                next.colIndex += 1;
            } else {
                next.rowIndex += 1;
                next.colIndex = 0;
            }
        } else if (next.colIndex > 0) {
            next.colIndex -= 1;
        } else {
            next.rowIndex -= 1;
            next.colIndex = visibleColumns.length - 1;
        }

        // Commit the edit before leaving (this is what makes type-a-code-then-Tab work in one press,
        // rather than needing an extra Enter first).
        if (apiRef.current.getCellMode(params.id, params.field) === 'edit') {
            apiRef.current.stopCellEditMode({ id: params.id, field: params.field });
        }

        apiRef.current.scrollToIndexes(next);
        apiRef.current.setCellFocus(rowIds[next.rowIndex], visibleColumns[next.colIndex].field);
    };

    // Pad every search column's code to its declared width. Exposed so a consumer that needs its own
    // processRowUpdate (extra per-row logic) can still reuse the padding.
    const padSearchCodes = row => {
        const updated = { ...row };
        searchColumns.forEach(c => {
            updated[c.field] = padCode(updated[c.field], c.pad);
        });
        return updated;
    };

    const processRowUpdate = (newRow, oldRow) => {
        let changedField;
        const updated = { ...newRow };

        searchColumns.forEach(c => {
            if (updated[c.field] !== oldRow?.[c.field]) {
                changedField = c.field;
                updated[c.field] = padCode(updated[c.field], c.pad);
            }
        });

        setRows(current => current.map(r => (getRowId(r) === getRowId(updated) ? updated : r)));
        onRowChange?.(updated, oldRow, changedField);
        return updated;
    };

    const writeResultToRow = (column, selected) => {
        const rowId = searchDialog.forRow;
        const currentRow = rows.find(r => getRowId(r) === rowId);
        const code = selected[column.resultIdField ?? 'id'] ?? selected.id;
        let updated = { ...currentRow, [column.field]: padCode(code, column.pad) };
        column.updateFields?.forEach(f => {
            updated = { ...updated, [f.field]: selected[f.from] };
        });

        setRows(current => current.map(r => (getRowId(r) === rowId ? updated : r)));
        onRowChange?.(updated, currentRow, column.field);
        closeDialog();
    };

    const searchDialogs = (
        <>
            {searchColumns.map(c => (
                <Dialog
                    key={c.field}
                    open={searchDialog.forColumn === c.field}
                    onClose={closeDialog}
                >
                    <DialogTitle>Search {c.headerName}</DialogTitle>
                    <DialogContent>
                        <Search
                            autoFocus
                            resultsInModal
                            resultLimit={100}
                            propertyName={`${c.field}-search`}
                            label=""
                            value={searchTerm}
                            handleValueChange={(_, newValue) => setSearchTerm(newValue)}
                            search={c.search}
                            searchResults={c.searchResults?.map(r => ({
                                ...r,
                                id: r[c.resultIdField ?? c.field] ?? r.id
                            }))}
                            loading={c.searchLoading}
                            priorityFunction="closestMatchesFirst"
                            onResultSelect={selected => writeResultToRow(c, selected)}
                            clearSearch={() => setSearchTerm('')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Close</Button>
                    </DialogActions>
                </Dialog>
            ))}
        </>
    );

    // Spread onto the DataGrid's own sx so the default invalid class renders yellow.
    const gridSx = {
        [`& .${DEFAULT_INVALID_CLASS}`]: { color: 'black', backgroundColor: 'yellow' }
    };

    return {
        apiRef,
        columns: decoratedColumns,
        handleCellKeyDown,
        processRowUpdate,
        padSearchCodes,
        searchDialogs,
        gridSx
    };
}

export default useEditableSearchGrid;
