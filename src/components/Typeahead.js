import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import SearchInputField from './SearchInputField';

import Title from './Title';
import Loading from './Loading';

const styles = theme => ({
    paper: {
        padding: theme.spacing(6)
    },
    boldHeader: {
        fontWeight: 'bold',
        width: '140px'
    },
    pullRight: {
        float: 'right'
    },
    halfWidth: {
        width: '50%'
    },
    biggerText: {
        fontSize: 14
    },
    a: {
        textDecoration: 'none'
    }
});

function Typeahead({ fetchItems, items, classes, title, loading, clearSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    useSearch(fetchItems, searchTerm, clearSearch);

    const handleSearchTermChange = (...args) => {
        setSearchTerm(args[1]);
    };

    const results = () => {
        if (items.length > 0) {
            return (
                <List>
                    {items.map(item => (
                        <Link key={item.id} to={item.href} className={classes.a}>
                            <ListItem key={item.id} button>
                                <Typography style={{ fontWeight: 600, width: 140 }}>
                                    {item.name}
                                </Typography>
                                <Typography>{item.description}</Typography>
                            </ListItem>
                        </Link>
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
                className={classes.halfWidth}
                placeholder="Search by id or description"
                onChange={handleSearchTermChange}
                type="search"
                margin="normal"
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
    classes: PropTypes.shape({}).isRequired,
    fetchItems: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
};

Typeahead.defaultProps = {
    title: '',
    loading: false
};

export default withStyles(styles)(Typeahead);
