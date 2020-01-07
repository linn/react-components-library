import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Done from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
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

export default function EditableTableRow({ row, columns, saveRow, editable, ...rest }) {
    const [editing, setEditing] = useState(false);
    const [prevItem, setPrevItem] = useState({});
    const [item, setItem] = useState({});

    useEffect(() => {
        setItem(row);
        setPrevItem(row);
    }, [row, editable]);

    const classes = useStyles();

    const handleSaveClick = () => {
        saveRow(item);
    };

    const handleCancelClick = () => {
        setEditing(false);
        setItem(prevItem);
    };

    const handleValueChange = (propertyName, newValue) => {
        setItem({ ...item, [propertyName]: newValue });
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
                <Fragment>
                    <TableCell>
                        <Button
                            onClick={handleSaveClick}
                            color="primary"
                            variant="outlined"
                            size="small"
                            classes={{
                                root: classes.button
                            }}
                            data-testid="saveButton"
                        >
                            <Done fontSize="small" />
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
                </Fragment>
            ) : (
                <Fragment>
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
                </Fragment>
            )}
        </TableRow>
    );
}

EditableTableRow.propTypes = {
    row: PropTypes.shape({}).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    saveRow: PropTypes.func,
    editable: PropTypes.bool
};

EditableTableRow.defaultProps = {
    saveRow: () => {},
    editable: true
};
