import React, { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { grey } from '@material-ui/core/colors';
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
    ...rest
}) {
    // TODO maybe remove these states all together?
    const [editing, setEditing] = useState(false);
    const [item, setItem] = useState({});
    const [rowValid, setRowValid] = useState();

    const isRowValidRef = useRef();

    useEffect(() => {
        isRowValidRef.current = isRowValid;
    }, [isRowValid]);

    useEffect(() => {
        setItem(row);
        setEditing(row.editing);
    }, [row]);

    useEffect(() => {
        if (editing) {
            let valid = true;

            if (validateRow) {
                valid = validateRow(item);
            }

            columns.forEach(column => {
                if (column.required === true && !item[column.id]) {
                    valid = false;
                }
            });

            if (isRowValidRef.current && item.id) {
                isRowValidRef.current(valid, item.id);
            }

            setRowValid(valid);
        }
    }, [item, validateRow, columns, editing]);

    const classes = useStyles();

    const handleCancelClick = () => {
        setEditing(false);
        resetRow(item);
    };

    const handleDeleteClick = () => {
        removeRow(item.id);
    };

    const handleValueChange = (propertyName, newValue) => {
        updateRow(item, setItem, propertyName, newValue);
    };

    const handleEditButtonClick = () => {
        setEditing(true);
        handleEditClick(item.id, true);
    };

    return (
        <TableRow onClick={!editing && !deleteRowPreEdit && handleEditButtonClick}>
            {columns.map(column => (
                <EditableTableCell
                    column={column}
                    item={item}
                    editable={editable}
                    editing={editing}
                    handleValueChange={handleValueChange}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...rest}
                />
            ))}
            {console.log('editable', editable)}
            {editable &&
                (editing ? (
                    <>
                        {/* TODO the new save thing here */}
                        {/* {!groupEdit && (
                            <TableCell>
                                <Button
                                    onClick={handleSaveClick}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    classes={{
                                        root: classes.button
                                    }}
                                    disabled={!rowValid}
                                    data-testid="saveButton"
                                >
                                    <Done style={{ color: grey[50] }} fontSize="small" />
                                </Button>
                            </TableCell>
                        )} */}
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
                                    >
                                        <Delete fontSize="small" />
                                    </Button>
                                </Tooltip>
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
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    updateRow: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    removeRow: PropTypes.func,
    validateRow: PropTypes.func,
    isRowValid: PropTypes.func,
    resetRow: PropTypes.func,
    deleteRowPreEdit: PropTypes.bool,
    handleEditClick: PropTypes.func
};

GroupEditableTableRow.defaultProps = {
    editable: true,
    removeRow: null,
    validateRow: null,
    isRowValid: null,
    resetRow: null,
    deleteRowPreEdit: false,
    handleEditClick: () => {}
};
