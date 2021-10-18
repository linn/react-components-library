import React, { Fragment, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import useSearch from '../hooks/useSearch';
import Title from './Title';
import Loading from './Loading';
import InputField from './InputField';
import SearchIcon from './SearchIcon';

const useStyles = makeStyles(theme => ({
    a: {
        textDecoration: 'none'
    },
    nameText: {
        fontWeight: theme.typography.fontWeightBold
    },
    bodyText: {
        color: theme.palette.text.primary
    },
    pullRight: {
        float: 'right'
    },
    dialog: {
        margin: theme.spacing(6),
        minWidth: theme.spacing(62)
    },
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

function Typeahead({
    fetchItems,
    items,
    title,
    loading,
    clearSearch,
    modal,
    links,
    label,
    onSelect,
    value,
    placeholder,
    disabled,
    minimumSearchTermLength,
    debounce,
    searchButtonOnly,
    propertyName,
    priorityFunction,
    resultLimit
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles();

    useSearch(fetchItems, searchTerm, clearSearch, null, null, debounce, minimumSearchTermLength);

    const handleSearchTermChange = (...args) => {
        setSearchTerm(args[1]);
    };

    const handleClick = e => {
        if (modal) {
            setDialogOpen(false);
        }
        if (clearSearch) {
            clearSearch();
        }
        setSearchTerm(null);
        if (!links) {
            onSelect(e);
        }
    };

    const Item = ({ item, onClick }) => (
        <ListItem button onClick={modal ? onClick : undefined}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography classes={{ root: classes.nameText }}>{item.name}</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography classes={{ root: classes.bodyText }}>{item.description}</Typography>
                </Grid>
            </Grid>
        </ListItem>
    );

    Item.propTypes = {
        item: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }).isRequired,
        onClick: PropTypes.func
    };

    Item.defaultProps = { onClick: null };

    const results = () => {
        if (loading) {
            return <Loading />;
        }

        let result = items;

        if (priorityFunction) {
            result = result
                .map(i => ({ ...i, priority: priorityFunction(i, searchTerm) }))
                .sort((a, b) => {
                    if (a.priority > b.priority) {
                        return -1;
                    }
                    if (a.priority < b.priority) {
                        return 1;
                    }
                    return 0;
                });
        }

        if (resultLimit) {
            result = result.slice(0, resultLimit);
        }

        if (result?.length > 0) {
            return (
                <List dense>
                    {result.map(item => (
                        <Fragment key={item.id}>
                            {links ? (
                                <Link className={classes.a} component={RouterLink} to={item?.href}>
                                    <Item item={item} onClick={() => handleClick(item)} />
                                </Link>
                            ) : (
                                <Item item={item} onClick={() => handleClick(item)} />
                            )}
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
            {!modal ? <Title text={title} /> : <></>}
            {modal && searchButtonOnly ? (
                <Tooltip title={label}>
                    <IconButton
                        disabled={disabled}
                        onClick={() => {
                            setDialogOpen(true);
                            clearSearch();
                        }}
                    >
                        {SearchIcon()}
                    </IconButton>
                </Tooltip>
            ) : (
                <InputField
                    adornment={SearchIcon()}
                    propertyName={propertyName}
                    textFieldProps={{
                        onClick: () => {
                            if (!disabled) {
                                setDialogOpen(true);
                                clearSearch();
                            }
                        },
                        disabled
                    }}
                    value={modal ? value : searchTerm}
                    label={label}
                    placeholder={placeholder}
                    onChange={modal ? () => setDialogOpen(true) : handleSearchTermChange}
                />
            )}
            {modal ? (
                <Dialog
                    data-testid="modal"
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    fullWidth
                    maxWidth="md"
                >
                    <div>
                        <IconButton
                            className={classes.pullRight}
                            aria-label="Close"
                            onClick={() => setDialogOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.dialog}>
                            <Typography variant="h5" gutterBottom>
                                {title}
                            </Typography>
                            <InputField
                                propertyName={propertyName}
                                adornment={SearchIcon()}
                                textFieldProps={{
                                    autoFocus: true
                                }}
                                placeholder={placeholder}
                                onChange={handleSearchTermChange}
                                value={searchTerm}
                            />
                            {loading ? <Loading /> : results()}
                        </div>
                    </div>
                </Dialog>
            ) : (
                results()
            )}
        </>
    );
}

const itemShape = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    href: PropTypes.string
};

Typeahead.propTypes = {
    propertyName: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape(itemShape)).isRequired,
    title: PropTypes.string,
    loading: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    modal: PropTypes.bool,
    links: PropTypes.bool,
    label: PropTypes.string,
    onSelect: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    minimumSearchTermLength: PropTypes.number,
    debounce: PropTypes.number,
    searchButtonOnly: PropTypes.bool,
    priorityFunction: PropTypes.func,
    resultLimit: PropTypes.number
};

Typeahead.defaultProps = {
    title: '',
    loading: false,
    modal: false,
    links: true,
    label: null,
    onSelect: null,
    value: null,
    placeholder: 'Search by id or by description',
    disabled: false,
    minimumSearchTermLength: 1,
    debounce: 500,
    searchButtonOnly: false,
    propertyName: '',
    priorityFunction: null,
    resultLimit: null
};

export default Typeahead;
