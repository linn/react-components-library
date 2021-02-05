import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SingleEditableTableRow from './SingleEditableTableRow';
import columnsProps from './columnsProps';

export default function SingleEditTable({
    columns,
    rows,
    saveRow,
    createRow,
    editable,
    newRow,
    updateRow,
    validateRow,
    deleteRow,
    allowNewRowCreation,
    closeRowOnClickAway,
    deleteRowPreEdit,
    editOnRowClick,
    newRowPosition,
    ...rest
}) {
    const [showNewRow, setShowNewRow] = useState(false);

    const handleRemoveRow = () => {
        setShowNewRow(false);
    };

    const renderNewRow = () =>
        showNewRow ? (
            <SingleEditableTableRow
                row={newRow}
                columns={columns}
                saveRow={createRow}
                editable={editable}
                isNewRow
                updateRow={updateRow}
                validateRow={validateRow}
                removeRow={handleRemoveRow}
                editOnRowClick={editOnRowClick}
                /* eslint-disable react/jsx-props-no-spreading */
                {...rest}
            />
        ) : (
            <TableRow>
                <TableCell>
                    <Button
                        size="small"
                        onClick={() => setShowNewRow(true)}
                        data-testid="addButton"
                    >
                        <AddIcon size="small" />
                    </Button>
                </TableCell>
            </TableRow>
        );

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {columns.map(column => (
                        <TableCell key={column.id}>{column.title}</TableCell>
                    ))}
                    <TableCell />
                    <TableCell />
                    {deleteRow && <TableCell />}
                </TableRow>
            </TableHead>
            <TableBody>
                {newRowPosition === 'top' && editable && allowNewRowCreation && (
                    <> {renderNewRow()} </>
                )}
                {rows.map(row => (
                    <SingleEditableTableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                        saveRow={saveRow}
                        editable={editable}
                        updateRow={updateRow}
                        validateRow={validateRow}
                        deleteRow={deleteRow}
                        closeRowOnClickAway={closeRowOnClickAway}
                        deleteRowPreEdit={deleteRowPreEdit}
                        editOnRowClick={editOnRowClick}
                    />
                ))}
                {newRowPosition === 'bottom' && editable && allowNewRowCreation && (
                    <> {renderNewRow()} </>
                )}
            </TableBody>
        </Table>
    );
}

SingleEditTable.propTypes = {
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    createRow: PropTypes.func,
    editable: PropTypes.bool,
    newRow: PropTypes.shape({}),
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    closeEditingOnSave: PropTypes.bool,
    allowNewRowCreation: PropTypes.bool,
    closeRowOnClickAway: PropTypes.bool,
    deleteRowPreEdit: PropTypes.bool,
    editOnRowClick: PropTypes.bool,
    newRowPosition: PropTypes.string
};

SingleEditTable.defaultProps = {
    saveRow: () => {},
    createRow: () => {},
    editable: true,
    newRow: {},
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    closeEditingOnSave: false,
    allowNewRowCreation: true,
    closeRowOnClickAway: false,
    deleteRowPreEdit: false,
    editOnRowClick: false,
    newRowPosition: 'bottom'
};
