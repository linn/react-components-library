import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Done from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { inputComponentFactory, displayComponentFactory } from './componentFactory';

const useStyles = makeStyles(theme => ({
    button: {
        maxWidth: theme.spacing(5),
        minWidth: theme.spacing(5),
        maxHeight: theme.spacing(3),
        minHeight: theme.spacing(3),
        padding: 0
    }
}));

export default function EditableTableRow({
    row,
    columns,
    saveRow,
    editable,
    isNewRow,
    removeRow,
    updateRow,
    validateRow,
    deleteRow,
    groupEdit,
    isRowValid,
    closeRowOnClickAway,
    resetRow,
    ...rest
}) {
    const [editing, setEditing] = useState(false);
    const [prevItem, setPrevItem] = useState({});
    const [item, setItem] = useState({});
    const [rowValid, setRowValid] = useState();

    const isRowValidRef = useRef();

    useEffect(() => {
        isRowValidRef.current = isRowValid;
    }, [isRowValid]);

    useEffect(() => {
        setItem(row);
        setPrevItem(row);
        if (isNewRow) {
            setEditing(true);
        }
    }, [row, isNewRow]);

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

    const handleSaveClick = () => {
        if (isNewRow) {
            removeRow(item.id);
        }

        saveRow(item);
    };

    const handleCancelClick = () => {
        if (isNewRow) {
            removeRow(item.id);
            return;
        }
        setEditing(false);

        if (groupEdit) {
            resetRow(item, prevItem);
        } else {
            setItem(prevItem);
        }
    };

    const handleDeleteClick = () => {
        if (!groupEdit) {
            deleteRow(item);
        } else {
            removeRow(item.id);
        }
    };

    const handleValueChange = (propertyName, newValue) => {
        if (updateRow) {
            updateRow(item, setItem, propertyName, newValue);
            return;
        }

        setItem({ ...item, [propertyName]: newValue });
    };

    const handleClickAway = e => {
        // for some reason clicks in modals that TableRows open register as clickAways
        // this leads to the annoying scenario where clicking in an input inside a modal closes the entire row
        // this check stops that happening, although there is probably a better solution
        if (e.target.tagName.toUpperCase() === 'INPUT') {
            return;
        }
        if (closeRowOnClickAway) {
            setEditing(false);
        }
    };

    return (
        <ClickAwayListener onClickAway={e => handleClickAway(e)}>
            <TableRow onClick={() => setEditing(true)}>
                {columns.map(column => (
                    <TableCell key={`${column.id}${item.id}`} id={column.type}>
                        {(editing && column.editable && editable) ||
                        (isNewRow && editing && column.required)
                            ? inputComponentFactory(item, column, handleValueChange, rest)
                            : displayComponentFactory(item, column)}
                    </TableCell>
                ))}
                {editable &&
                    (editing ? (
                        <>
                            {!groupEdit && (
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
                            )}
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
                                        data-testid="clearButton"
                                    >
                                        <Clear fontSize="small" />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                            {deleteRow && !isNewRow && (
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
                                        onClick={() => setEditing(true)}
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
                            {deleteRow && !isNewRow && (
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
        </ClickAwayListener>
    );
}

EditableTableRow.propTypes = {
    row: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    editable: PropTypes.bool,
    isNewRow: PropTypes.bool,
    removeRow: PropTypes.func,
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    groupEdit: PropTypes.bool,
    isRowValid: PropTypes.func,
    resetRow: PropTypes.func,
    closeRowOnClickAway: PropTypes.bool
};

EditableTableRow.defaultProps = {
    saveRow: () => {},
    editable: true,
    isNewRow: false,
    removeRow: null,
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    groupEdit: false,
    isRowValid: null,
    resetRow: null,
    closeRowOnClickAway: false
};
