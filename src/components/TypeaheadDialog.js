import React, { Fragment, useState } from 'react';
import {
    List,
    ListItem,
    InputAdornment,
    TextField,
    Typography,
    IconButton,
    Dialog
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import useSearch from '../hooks/useSearch';
import Loading from './Loading';

const styles = {
    pullRight: {
        float: 'right'
    },
    a: {
        textDecoration: 'none'
    },
    dialog: {
        margin: '50px',
        minWidth: '500px'
    }
};

const TypeaheadDialog = ({ title, loading, fetchItems, searchItems, onSelect, clearSearch }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    useSearch(fetchItems, searchTerm);

    const handleOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const showResults = () => {
        const handleClick = e => {
            setDialogOpen(false);
            clearSearch();
            onSelect(e);
        };

        if (searchItems.length > 0) {
            return (
                <List>
                    {searchItems.map(item => (
                        <ListItem key={item.id}>
                            <ListItem key={item.id} onClick={() => handleClick(item)} button>
                                <Typography style={{ fontWeight: 600, width: 140 }}>
                                    {item.name}
                                </Typography>
                                <Typography>{item.description}</Typography>
                            </ListItem>
                        </ListItem>
                    ))}
                </List>
            );
        }

        return <Typography>No matching items</Typography>;
    };

    return (
        <Fragment>
            <IconButton aria-label="Search" onClick={handleOpen}>
                <SearchIcon fontSize="large" />
            </IconButton>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <div>
                    <IconButton style={styles.pullRight} aria-label="Close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div style={styles.dialog}>
                        <Typography variant="h5" gutterBottom>
                            {title}
                        </Typography>
                        <TextField
                            placeholder="Search by id or description"
                            onChange={e => setSearchTerm(e.target.value)}
                            type="search"
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                        </svg>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {loading ? <Loading /> : showResults()}
                    </div>
                </div>
            </Dialog>
        </Fragment>
    );
};

export default TypeaheadDialog;

TypeaheadDialog.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
    searchItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onSelect: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
};

TypeaheadDialog.defaultProps = {
    title: 'Start typing to search',
    loading: false
};
