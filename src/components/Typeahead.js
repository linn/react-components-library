import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from './Title';
import Loading from './Loading';
import SearchInputField from './SearchInputField';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 6
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

class Typeahead extends Component {
    constructor(props) {
        super();
        props.clearSearch();
        this.debounceTimer = null;
    }

    handleSearchTermChange(e) {
        const { fetchItems, clearSearch } = this.props;
        const searchTerm = e.target.value;
        if (searchTerm) {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }

            this.debounceTimer = setTimeout(() => fetchItems(searchTerm), 500);
        } else {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }

            clearSearch();
        }
    }

    results() {
        const { items, classes } = this.props;
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
    }

    render() {
        const { title, loading, classes } = this.props;

        return (
            <Fragment>
                <Title text={title} />
                <SearchInputField
                    classes={{ root: classes.halfWidth }}
                    placeholder="Search by id or description"
                    onChange={e => this.handleSearchTermChange(e)}
                    type="search"
                    margin="normal"
                    variant="outlined"
                />
                {loading ? <Loading /> : this.results()}
            </Fragment>
        );
    }
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
