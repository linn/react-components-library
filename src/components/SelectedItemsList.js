import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

function SelectedItemsList({ items, removeItem, title, maxHeight }) {
    return (
        <>
            <Typography
                variant="body1"
                sx={{
                    marginBottom: '8px'
                }}
            >
                {title}
            </Typography>
            <List
                dense
                sx={{
                    width: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    ...(maxHeight && { maxHeight })
                }}
            >
                {items.map(item => (
                    <React.Fragment key={item.id ? item.id : item}>
                        <ListItem
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 16px'
                            }}
                        >
                            <ListItemText primary={item.displayText ? item.displayText : item} />
                            {removeItem && (
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => removeItem(item.id ? item.id : item)}
                                    size="large"
                                    sx={{
                                        marginLeft: 'auto'
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </>
    );
}

SelectedItemsList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]))
        .isRequired,
    removeItem: PropTypes.func,
    title: PropTypes.string,
    maxHeight: PropTypes.number
};

SelectedItemsList.defaultProps = {
    removeItem: null,
    title: 'Items Selected',
    maxHeight: null
};

export default SelectedItemsList;
