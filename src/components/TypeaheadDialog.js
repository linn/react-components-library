import React, { Fragment, useState } from 'react';
import { List, ListItem, Typography, IconButton, Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import useSearch from '../hooks/useSearch';
import Loading from './Loading';
import SearchInputField from './SearchInputField';

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

    useSearch(fetchItems, searchTerm, clearSearch);

    const handleOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleSearchTermChange = (...args) => {
        setSearchTerm(args[1]);
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
                        <SearchInputField
                            placeholder="Search by id or description"
                            onChange={handleSearchTermChange}
                            label=""
                            value={searchTerm}
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
