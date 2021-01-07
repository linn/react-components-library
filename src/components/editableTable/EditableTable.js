import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditableTableRow from './EditableTableRow';

export default function EditableTable({
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
    groupEdit,
    addRow,
    tableValid,
    removeRow,
    resetRow,
    closeRowOnClickAway,
    ...rest
}) {
    const [showNewRow, setShowNewRow] = useState(false);
    const [rowsValid, setRowsValid] = useState([]);

    useEffect(() => {
        if (tableValid) {
            tableValid(!rowsValid.some(row => !row.valid));
        }
    }, [rowsValid, tableValid]);

    const handleRemoveRow = id => {
        if (!groupEdit) {
            setShowNewRow(false);
        } else {
            removeRow(id);
        }
    };

    const handleAddClick = () => {
        if (!groupEdit) {
            setShowNewRow(true);
        } else {
            addRow();
        }
    };

    const handleIsRowValid = (valid, id) => {
        if (rowsValid.some(row => row.id === id)) {
            setRowsValid(
                rowsValid.map(row => {
                    if (row.id === id) {
                        return { ...row, valid };
                    }
                    return row;
                })
            );
        } else {
            setRowsValid([...rowsValid, { id, valid }]);
        }

        if (tableValid) {
            tableValid(!rowsValid.some(row => !row.valid));
        }
    };

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
            <>
                <TableBody>
                    {rows.map(row => {
                        /* eslint-disable react/jsx-props-no-spreading */
                        return (
                            <EditableTableRow
                                row={row}
                                columns={columns}
                                key={row.id}
                                saveRow={saveRow}
                                editable={editable}
                                updateRow={updateRow}
                                validateRow={validateRow}
                                deleteRow={deleteRow}
                                isNewRow={row.isNewRow}
                                groupEdit={groupEdit}
                                removeRow={handleRemoveRow}
                                isRowValid={handleIsRowValid}
                                resetRow={resetRow}
                                closeRowOnClickAway={closeRowOnClickAway}
                                {...rest}
                            />
                        );
                    })}

                    {editable && allowNewRowCreation && !showNewRow && (
                        <TableRow>
                            <TableCell>
                                <Button
                                    size="small"
                                    onClick={handleAddClick}
                                    data-testid="addButton"
                                >
                                    <AddIcon size="small" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}

                    {showNewRow && (
                        /* eslint-disable react/jsx-props-no-spreading */
                        <EditableTableRow
                            row={newRow}
                            columns={columns}
                            saveRow={createRow}
                            editable={editable}
                            isNewRow
                            removeRow={handleRemoveRow}
                            updateRow={updateRow}
                            validateRow={validateRow}
                            deleteRow={deleteRow}
                            groupEdit={groupEdit}
                            {...rest}
                        />
                    )}
                </TableBody>
            </>
        </Table>
    );
}

EditableTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    createRow: PropTypes.func,
    editable: PropTypes.bool,
    newRow: PropTypes.shape({}),
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    allowNewRowCreation: PropTypes.bool,
    groupEdit: PropTypes.bool,
    addRow: PropTypes.func,
    removeRow: PropTypes.func,
    tableValid: PropTypes.func,
    resetRow: PropTypes.func,
    closeRowOnClickAway: PropTypes.bool
};

EditableTable.defaultProps = {
    saveRow: () => {},
    createRow: () => {},
    editable: true,
    newRow: {},
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    allowNewRowCreation: true,
    groupEdit: false,
    addRow: null,
    removeRow: null,
    tableValid: null,
    resetRow: null,
    closeRowOnClickAway: false
};
