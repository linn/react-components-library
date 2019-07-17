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
import useSearch from '../hooks/useSearch';
import SearchInputField from './SearchInputField';
import Title from './Title';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
    a: {
        textDecoration: 'none'
    },
    nameText: {
        fontWeight: theme.typography.fontWeightBold
    },
    bodyText: {
        color: theme.palette.text.primary
    }
}));

function Typeahead({ fetchItems, items, title, loading, clearSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const classes = useStyles();

    useSearch(fetchItems, searchTerm, clearSearch);

    const handleSearchTermChange = (...args) => {
        setSearchTerm(args[1]);
    };

    const results = () => {
        if (items.length > 0) {
            return (
                <List dense>
                    {items.map(item => (
                        <Fragment>
                            <Link
                                className={classes.a}
                                component={RouterLink}
                                key={item.id}
                                to={item.href}
                            >
                                <ListItem button>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Typography classes={{ root: classes.nameText }}>
                                                {item.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography classes={{ root: classes.bodyText }}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </Link>
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
            <Title text={title} />
            <SearchInputField
                placeholder="Search by id or description"
                onChange={handleSearchTermChange}
                type="search"
                variant="outlined"
                value={searchTerm}
            />
            {loading ? <Loading /> : results()}
        </Fragment>
    );
}

Typeahead.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            description: PropTypes.string,
            href: PropTypes.string
        })
    ).isRequired,
    title: PropTypes.string,
    loading: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
};

Typeahead.defaultProps = {
    title: '',
    loading: false
};

export default Typeahead;
