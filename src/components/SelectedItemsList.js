import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
    list: (props) => {
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
                {items.map((item) => (
                    <>
                        <ListItem key={item.id ? item.id : item}>
                            <ListItemText primary={item.displayText ? item.displayText : item} />
                            {removeItem ? (
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => removeItem(item.Id ? item.Id : item)}
                                        size="large"
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
