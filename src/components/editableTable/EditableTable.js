import React, { useState } from 'react';
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
    ...rest
}) {
    const [showNewRow, setShowNewRow] = useState(false);

    const hideNewRow = () => setShowNewRow(false);

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {columns.map(column => (
                        <TableCell key={column.id}>{column.title}</TableCell>
                    ))}
                    <TableCell />
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                    <EditableTableRow
                        key={row.id}
                        row={row}
                        columns={columns}
                        saveRow={saveRow}
                        editable={editable}
                    />
                ))}
                {editable &&
                    (showNewRow ? (
                        <EditableTableRow
                            row={newRow}
                            columns={columns}
                            saveRow={createRow}
                            editable={editable}
                            isNewRow
                            hideNewRow={hideNewRow}
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
                    ))}
            </TableBody>
        </Table>
    );
}

EditableTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    createRow: PropTypes.func,
    editable: PropTypes.bool,
    newRow: PropTypes.shape({})
};

EditableTable.defaultProps = {
    saveRow: () => {},
    createRow: () => {},
    editable: true,
    newRow: {}
};
