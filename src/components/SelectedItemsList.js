import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

function SelectedItemsList({
    items,
    removeItem = null,
    title = 'Items Selected',
    maxHeight = null
}) {
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
                    <Fragment key={item.id ? item.id : item}>
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
                    </Fragment>
                ))}
            </List>
        </>
    );
}

export default SelectedItemsList;
