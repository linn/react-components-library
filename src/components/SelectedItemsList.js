import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    list: props => {
        const root = {
            width: '100%',
            position: 'relative',
            overflow: 'auto'
        };

        if (props.maxHeight) {
            return { ...root, maxHeight: props.maxHeight };
        }

        return root;
    }
}));

function SelectedItemsList({ items, removeItem, title, maxHeight }) {
    const styleProps = {
        maxHeight
    };

    const classes = useStyles(styleProps);

    return (
        <>
            <Typography variant="body1">{title}</Typography>
            <List dense className={classes.list}>
                {items.map(item => (
                    <>
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
                        <Divider />
                    </>
                ))}
            </List>
        </>
    );
}

SelectedItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    removeItem: PropTypes.func,
    title: PropTypes.string,
    maxHeight: PropTypes.number
};

SelectedItemsList.defaultProps = {
    items: [],
    removeItem: null,
    title: 'Items Selected',
    maxHeight: null
};

export default SelectedItemsList;
