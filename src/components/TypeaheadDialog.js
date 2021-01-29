import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
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

function TypeaheadDialog({ title, loading, fetchItems, searchItems, onSelect, clearSearch, debounce, minimumSearchTermLength }) {
    const [searchTerm, setSearchTerm] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles();

    useSearch(fetchItems, searchTerm, clearSearch, null, null, debounce, minimumSearchTermLength);

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
            setSearchTerm(null);
            onSelect(e);
        };

        if (searchItems.length > 0) {
            return (
                <List>
                    {searchItems.map(item => (
                        <Fragment key={item.id}>
                            <ListItem onClick={() => handleClick(item)} button>
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
        <>
            <Tooltip title={title}>
                <Button
                    color="primary"
                    aria-label="Search"
                    onClick={handleOpen}
                    variant="outlined"
                    className={classes.button}
                >
                    <SearchIcon />
                </Button>
            </Tooltip>

            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                disableAutoFocus
            >
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
                            autoFocus
                        />
                        {loading ? <Loading /> : showResults()}
                    </div>
                </div>
            </Dialog>
        </>
    );
}

TypeaheadDialog.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
    searchItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onSelect: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    debounce: PropTypes.number,
    minimumSearchTermLength: PropTypes.number
};

TypeaheadDialog.defaultProps = {
    title: 'Start typing to search',
    loading: false,
    debounce: 500,
    minimumSearchTermLength: 1
};

export default TypeaheadDialog;
