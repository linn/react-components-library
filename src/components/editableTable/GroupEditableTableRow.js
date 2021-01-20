import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import EditableTableCell from './EditableTableCell';
import columnsProps from './columnsProps';

const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: theme.spacing(5),
        minWidth: theme.spacing(5),
        maxHeight: theme.spacing(3),
        minHeight: theme.spacing(3),
        padding: 0
    },
    row: {
        backgroundColor: props => {
            if (props.toBeSaved) {
                return green[50];
            }
            if (props.toBeDeleted) {
                return red[50];
            }
            return 'transparent';
        }
    }
}));

export default function GroupEditableTableRow({
    row,
    columns,
    editable,
    updateRow,
    validateRow,
    removeRow,
    isRowValid,
    resetRow,
    deleteRowPreEdit,
    handleEditClick,
    setRowToBeSaved,
    setRowToBeDeleted,
    removeRowOnDelete,
    ...rest
}) {
    const [rowValid, setRowValid] = useState();

    const isRowValidRef = useRef();

    const classes = useStyles({ toBeSaved: row.toBeSaved, toBeDeleted: row.toBeDeleted });

    useEffect(() => {
        isRowValidRef.current = isRowValid;
    }, [isRowValid]);

    useEffect(() => {
        if (row.editing) {
            let valid = true;

            if (validateRow) {
                valid = validateRow(row);
            }

            columns.forEach(column => {
                if (column.required === true && !row[column.id]) {
                    valid = false;
                }
            });

            if (isRowValidRef.current && row.id) {
                isRowValidRef.current(valid, row.id);
            }

            setRowValid(valid);
        }
    }, [validateRow, columns, row]);

    const handleCancelClick = () => {
        if (row.isNewRow) {
            removeRow(row.id);
        } else {
            resetRow(row);
        }
    };

    const handleValueChange = (propertyName, newValue) => {
        updateRow(row, null, propertyName, newValue);
    };

    const handleEditButtonClick = () => {
        handleEditClick(row.id, true);
    };

    const handleDeleteClick = () => {
        if (removeRowOnDelete || row.isNewRow) {
            removeRow(row.id);
        } else {
            setRowToBeDeleted(row.id, true);
        }
    };

    const handleSaveClick = () => {
        setRowToBeSaved(row.id, true);
    };

    const saveButtonEnabled = () => {
        return !!(rowValid && !row.toBeDeleted && !row.toBeSaved);
    };

    const deleteButtonEnabled = () => {
        return !row.toBeDeleted && !row.toBeSaved;
    };

    return (
        <TableRow
            onClick={!row.editing && !deleteRowPreEdit ? handleEditButtonClick : undefined}
            classes={{ root: classes.row }}
        >
            {columns.map(column => (
                <EditableTableCell
                    key={`${row.id}${column.id}`}
                    column={column}
                    item={row}
                    editable={editable}
                    editing={row.editing}
                    handleValueChange={handleValueChange}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...rest}
                />
            ))}
            {editable &&
                (row.editing ? (
                    <>
                        <TableCell>
                            <Button
                                onClick={handleSaveClick}
                                color="primary"
                                variant="outlined"
                                size="small"
                                classes={{
                                    root: classes.button
                                }}
                                disabled={!saveButtonEnabled()}
                                data-testid="saveButton"
                            >
                                <Save fontSize="small" />
                            </Button>
                        </TableCell>
                        <TableCell>
                            <Tooltip title="Revert changes to row">
                                <Button
                                    onClick={handleCancelClick}
                                    color="secondary"
                                    variant="outlined"
                                    classes={{
                                        root: classes.button
                                    }}
                                    size="small"
                                    data-testid="cancelButton"
                                >
                                    <Clear fontSize="small" />
                                </Button>
                            </Tooltip>
                        </TableCell>
                        {removeRow && (
                            <TableCell>
                                <Button
                                    onClick={handleDeleteClick}
                                    color="secondary"
                                    variant="contained"
                                    classes={{
                                        root: classes.button
                                    }}
                                    size="small"
                                    data-testid="deleteButton"
                                    disabled={!deleteButtonEnabled()}
                                >
                                    <Delete fontSize="small" />
                                </Button>
                            </TableCell>
                        )}
                    </>
                ) : (
                    <>
                        <TableCell>
                            <Tooltip title="Edit Row">
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={handleEditButtonClick}
                                    size="small"
                                    classes={{
                                        root: classes.button
                                    }}
                                    data-testid="editButton"
                                >
                                    <EditIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        </TableCell>
                        {removeRow && deleteRowPreEdit && (
                            <TableCell>
                                <Tooltip title="Remove Row">
                                    <Button
                                        onClick={handleDeleteClick}
                                        color="secondary"
                                        variant="contained"
                                        classes={{
                                            root: classes.button
                                        }}
                                        size="small"
                                        data-testid="deleteButton"
                                        disabled={!deleteButtonEnabled()}
                                    >
                                        <Delete fontSize="small" />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        )}
                        <TableCell />
                    </>
                ))}
        </TableRow>
    );
}

GroupEditableTableRow.propTypes = {
    row: PropTypes.shape({
        editing: PropTypes.bool,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        toBeDeleted: PropTypes.bool,
        toBeSaved: PropTypes.bool,
        isNewRow: PropTypes.bool
    }).isRequired,
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    updateRow: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    removeRow: PropTypes.func,
    validateRow: PropTypes.func,
    isRowValid: PropTypes.func,
    resetRow: PropTypes.func,
    deleteRowPreEdit: PropTypes.bool,
    handleEditClick: PropTypes.func,
    setRowToBeDeleted: PropTypes.func,
    setRowToBeSaved: PropTypes.func.isRequired,
    removeRowOnDelete: PropTypes.bool
};

GroupEditableTableRow.defaultProps = {
    editable: true,
    removeRow: null,
    validateRow: null,
    isRowValid: null,
    resetRow: null,
    deleteRowPreEdit: false,
    handleEditClick: () => {},
    removeRowOnDelete: false,
    setRowToBeDeleted: () => {}
};
