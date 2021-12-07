import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
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
        <Paper style={{ overflow: 'auto' }}>
            <Table tyle={{ tableLayout: 'auto' }} size="small">
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
        </Paper>
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
