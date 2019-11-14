import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function SelectedItemsList({ items, removeItem, title }) {
    return (
        <Fragment>
            <Typography variant="body1">{title}</Typography>
            <List dense>
                {items.map(item => (
                    <ListItem key={item.id ? item.id : item}>
                        <ListItemText primary={item.displayText ? item.displayText : item} />
                        {removeItem ? (
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => removeItem(item.Id ? item.Id : item)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        ) : (
                            ''
                        )}
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}

SelectedItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    removeItem: PropTypes.func,
    title: PropTypes.string
};

SelectedItemsList.defaultProps = {
    items: [],
    removeItem: null,
    title: 'Items Selected'
};

export default SelectedItemsList;
