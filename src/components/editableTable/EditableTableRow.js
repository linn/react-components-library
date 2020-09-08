import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Done from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
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
    hideNewRow,
    updateRow,
    validateRow,
    deleteRow,
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
    }, [row, editable, isNewRow]);

    const classes = useStyles();

    const handleSaveClick = () => {
        saveRow(item);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setItem(prevItem);
        if (isNewRow) {
            hideNewRow();
        }
    };

    const handleDeleteClick = () => {
        deleteRow(item);
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

    return (
        <TableRow>
            {columns.map(column => (
                <TableCell key={`${column.id}${item.id}`}>
                    {editing && column.editable && editable
                        ? inputComponentFactory(item, column, handleValueChange, rest)
                        : displayComponentFactory(item, column)}
                </TableCell>
            ))}
            {editing && editable ? (
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
                    </TableCell>
                    {deleteRow && (
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
                            >
                                <Delete fontSize="small" />
                            </Button>
                        </TableCell>
                    )}
                </>
            ) : (
                <>
                    <TableCell>
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
                    </TableCell>
                    <TableCell />
                </>
            )}
        </TableRow>
    );
}

EditableTableRow.propTypes = {
    row: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    editable: PropTypes.bool,
    isNewRow: PropTypes.bool,
    hideNewRow: PropTypes.func,
    updateRow: PropTypes.func,
    validateRow: PropTypes.func,
    deleteRow: PropTypes.func
};

EditableTableRow.defaultProps = {
    saveRow: () => {},
    editable: true,
    isNewRow: false,
    hideNewRow: null,
    updateRow: null,
    validateRow: null,
    deleteRow: null
};
