import React, { Fragment, useState } from 'react';
import {
    List,
    ListItem,
    Typography,
    IconButton,
    Dialog,
    Button,
    Divider,
    Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import useSearch from '../hooks/useSearch';
import Loading from './Loading';
import SearchInputField from './SearchInputField';

const useStyles = makeStyles(theme => ({
    pullRight: {
        float: 'right'
    },
    a: {
        textDecoration: 'none'
    },
    dialog: {
        margin: theme.spacing(6),
        minWidth: theme.spacing(62)
    },
    nameText: {
        fontWeight: theme.typography.fontWeightMedium
    },
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

function TypeaheadDialog({ title, loading, fetchItems, searchItems, onSelect, clearSearch }) {
    const [searchTerm, setSearchTerm] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles();

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
                        <Fragment>
                            <ListItem key={item.id} onClick={() => handleClick(item)} button>
                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <Typography classes={{ root: classes.nameText }}>
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography>{item.description}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <Divider component="li" />
                        </Fragment>
                    ))}
                </List>
            );
        }

        return <Typography>No matching items</Typography>;
    };

    return (
        <Fragment>
            <Button
                color="primary"
                aria-label="Search"
                onClick={handleOpen}
                variant="outlined"
                className={classes.button}
            >
                <SearchIcon />
            </Button>

            <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div>
                    <IconButton
                        className={classes.pullRight}
                        aria-label="Close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.dialog}>
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
}

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

export default TypeaheadDialog;
