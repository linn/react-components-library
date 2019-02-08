import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem, InputAdornment, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from './Title';
import Loading from './Loading';

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
        textDecoration: 'none !important'
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
                        <Link to={item.href} className={classes.a}>
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
                <TextField
                    className={classes.halfWidth}
                    placeholder="Search by id or description"
                    onChange={e => this.handleSearchTermChange(e)}
                    type="search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: classes.biggerText
                        },
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
