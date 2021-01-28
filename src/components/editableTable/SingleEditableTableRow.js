import React, { useState, useEffect } from 'react';
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

export default function SingleEditableTableRow({
    row,
    columns,
    saveRow,
    editable,
    isNewRow,
    removeRow,
    updateRow,
    validateRow,
    deleteRow,
    closeRowOnClickAway,
    deleteRowPreEdit,
    editOnRowClick,
    ...rest
}) {
    const [editing, setEditing] = useState(false);
    const [prevItem, setPrevItem] = useState({});
    const [item, setItem] = useState({});

    useEffect(() => {
        setItem(row);
        setPrevItem(row);
        if (isNewRow) {
            setEditing(true);
        }
    }, [row, isNewRow]);

    const classes = useStyles();

    const handleSaveClick = () => {
        saveRow(item);
    };

    const handleCancelClick = () => {
        if (isNewRow) {
            removeRow(item.id);
            return;
        }

        setEditing(false);
        setItem(prevItem);
    };

    const handleDeleteClick = () => {
        deleteRow(item.id);
    };

    const handleValueChange = (propertyName, newValue) => {
        if (updateRow) {
            updateRow(item, setItem, propertyName, newValue);
            return;
        }

        setItem({ ...item, [propertyName]: newValue });
    };

    const rowValid = () => {
        let valid = true;

        if (validateRow) {
            valid = validateRow(item);
        }

        columns.forEach(column => {
            if (column.required === true && !item[column.id]) {
                valid = false;
            }
        });
        return valid;
    };

    const handleClickAway = e => {
        // for some reason clicks in modals that TableRows open register as clickAways
        // this leads to the annoying scenario where clicking in an input inside a modal closes the entire row
        // this check stops that happening, although there is probably a better solution
        if (e.target.tagName.toUpperCase() === 'INPUT' || !closeRowOnClickAway) {
            return;
        }
        if (closeRowOnClickAway) {
            setEditing(false);
        }
    };

    const handleEditButtonClick = () => {
        setEditing(true);
    };

    return (
        <ClickAwayListener onClickAway={e => handleClickAway(e)}>
            <TableRow
                onClick={!editing && editOnRowClick && !deleteRowPreEdit && handleEditButtonClick}
            >
                {columns.map(column => (
                    <EditableTableCell
                        key={`${row.id}${column.id}`}
                        column={column}
                        item={item}
                        editable={editable}
                        editing={editing}
                        isNewRow={isNewRow}
                        handleValueChange={handleValueChange}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...rest}
                    />
                ))}
                {editable &&
                    (editing ? (
                        <>
                            <TableCell>
                                <Button
                                    onClick={handleSaveClick}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    classes={{
                                        root: classes.button
                                    }}
                                    disabled={!rowValid()}
                                    data-testid="saveButton"
                                >
                                    <Done style={{ color: grey[50] }} fontSize="small" />
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
                            {deleteRow && (
                                <TableCell>
                                    <Tooltip title="Delete Row">
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
                            {!isNewRow && deleteRow && deleteRowPreEdit && (
                                <TableCell>
                                    <Tooltip title="Delete Row">
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

SingleEditableTableRow.propTypes = {
    row: PropTypes.shape({
        editing: PropTypes.bool,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    columns: PropTypes.arrayOf(columnsProps).isRequired,
    saveRow: PropTypes.func,
    editable: PropTypes.bool,
    isNewRow: PropTypes.bool,
    removeRow: PropTypes.func,
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func,
    closeRowOnClickAway: PropTypes.bool,
    deleteRowPreEdit: PropTypes.bool,
    editOnRowClick: PropTypes.bool
};

SingleEditableTableRow.defaultProps = {
    saveRow: () => {},
    editable: true,
    isNewRow: false,
    removeRow: null,
    updateRow: null,
    validateRow: null,
    deleteRow: null,
    closeRowOnClickAway: false,
    deleteRowPreEdit: false,
    editOnRowClick: false
};
