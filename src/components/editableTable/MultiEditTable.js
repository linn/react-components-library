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
import columnsProps from './columnsProps';

export default function MultiEditTable({
    columns,
    rows,
    editable,
    newRow,
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
    ...rest
}) {
    const [rowsValid, setRowsValid] = useState([]);

    useEffect(() => {
        tableValid(!rowsValid.some(row => !row.valid));
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

        tableValid(!rowsValid.some(row => !row.valid));
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
            <TableBody>
                {rows.map(row => (
                    /* eslint-disable react/jsx-props-no-spreading */
                    <EditableTableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                        editable={editable}
                        updateRow={updateRow}
                        validateRow={validateRow}
                        isNewRow={row.isNewRow}
                        groupEdit
                        removeRow={handleRemoveRow}
                        isRowValid={handleIsRowValid}
                        resetRow={resetRow}
                        deleteRowPreEdit={deleteRowPreEdit}
                        {...rest}
                    />
                ))}

                {editable && allowNewRowCreation && (
                    <TableRow>
                        <TableCell>
                            <Button size="small" onClick={handleAddClick} data-testid="addButton">
                                <AddIcon size="small" />
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

MultiEditTable.propTypes = {
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    editable: PropTypes.bool,
    newRow: PropTypes.shape({}),
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    allowNewRowCreation: PropTypes.bool,
    addRow: PropTypes.func,
    tableValid: PropTypes.func,
    removeRow: PropTypes.func,
    resetRow: PropTypes.func,
    closeRowOnClickAway: PropTypes.bool,
    deleteRowPreEdit: PropTypes.bool
};

MultiEditTable.defaultProps = {
    editable: true,
    newRow: {},
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    allowNewRowCreation: true,
    addRow: () => {},
    tableValid: () => {},
    removeRow: () => {},
    resetRow: () => {},
    closeRowOnClickAway: false,
    deleteRowPreEdit: false
};
