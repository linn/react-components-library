import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import GroupEditableTableRow from './GroupEditableTableRow';
import columnsProps from './columnsProps';

export default function GroupEditTable({
    columns,
    rows,
    editable,
    updateRow,
    validateRow,
    deleteRow,
    allowNewRowCreation,
    addRow,
    tableValid,
    removeRow,
    resetRow,
    closeRowOnClickAway,
    deleteRowPreEdit,
    handleEditClick,
    setRowToBeSaved,
    setRowToBeDeleted,
    removeRowOnDelete,
    editOnRowClick,
    ...rest
}) {
    const [rowsValid, setRowsValid] = useState([]);

    useEffect(() => {
        if (tableValid) {
            tableValid(!rowsValid.some(row => !row.valid));
        }
    }, [rowsValid, tableValid]);

    const handleRemoveRow = id => {
        removeRow(id);
    };

    const handleAddClick = () => {
        addRow();
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
        <Paper style={{ overflow: 'auto' }}>
            <Table style={{ tableLayout: 'auto' }} size="small">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key={column.id} style={column.style?.head}>
                                {column.title}
                            </TableCell>
                        ))}
                        <TableCell />
                        <TableCell />
                        {deleteRow && <TableCell />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        /* eslint-disable react/jsx-props-no-spreading */
                        <GroupEditableTableRow
                            key={row.id}
                            row={row}
                            columns={columns}
                            editable={editable}
                            updateRow={updateRow}
                            validateRow={validateRow}
                            removeRow={removeRow ? handleRemoveRow : null}
                            isRowValid={handleIsRowValid}
                            resetRow={resetRow}
                            deleteRowPreEdit={deleteRowPreEdit}
                            handleEditClick={handleEditClick}
                            setRowToBeDeleted={setRowToBeDeleted}
                            setRowToBeSaved={setRowToBeSaved}
                            removeRowOnDelete={removeRowOnDelete}
                            closeRowOnClickAway={closeRowOnClickAway}
                            editOnRowClick={editOnRowClick}
                            {...rest}
                        />
                    ))}

                    {editable && allowNewRowCreation && (
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
                </TableBody>
            </Table>
        </Paper>
    );
}

GroupEditTable.propTypes = {
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleEditClick: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    allowNewRowCreation: PropTypes.bool,
    addRow: PropTypes.func,
    tableValid: PropTypes.func,
    removeRow: PropTypes.func,
    resetRow: PropTypes.func,
    closeRowOnClickAway: PropTypes.bool,
    deleteRowPreEdit: PropTypes.bool,
    setRowToBeDeleted: PropTypes.func.isRequired,
    setRowToBeSaved: PropTypes.func.isRequired,
    removeRowOnDelete: PropTypes.bool,
    editOnRowClick: PropTypes.bool
};

GroupEditTable.defaultProps = {
    editable: true,
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    allowNewRowCreation: true,
    addRow: null,
    tableValid: null,
    removeRow: null,
    resetRow: null,
    closeRowOnClickAway: false,
    deleteRowPreEdit: false,
    removeRowOnDelete: false,
    editOnRowClick: false
};
