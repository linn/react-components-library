import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = {
    root: {
        width: '100%',
        paddingBottom: '40px'
    },
    a: {
        color: 'black'
    }
};

class Breadcrumbs extends Component {
    render() {
        const { classes, history, rootPathLength = 2 } = this.props;

        let path = history.location.pathname;
        const crumbs = path.split('/').reduce((sofar, crumb, i, list) => {
            path = list.slice(0, i + 1);
            const href = path.join('/') || '/';
            const handleClick = e => {
                // we should just let the browser handle any paths
                // shorter than our root path, e.g.the 'Home' path
                if (path.length > rootPathLength) {
                    e.preventDefault();
                    history.push(href);
                }
            };

            return [
                ...sofar,
                { key: i, caption: crumb || 'Home', href, onClick: e => handleClick(e) }
            ];
        }, []);

        return (
            <div className={classes.root}>
                <Typography variant="subtitle2">
                    {crumbs.map((crumb, index) => (
                        <span>
                            <NavLink className={classes.a} to={crumb.href} key={crumb.caption}>
                                <strong>{crumb.caption}</strong>
                            </NavLink>
                            {index < crumbs.length - 1 ? <strong> {'>'} </strong> : false}
                        </span>
                    ))}
                </Typography>
            </div>
        );
    }
}

Breadcrumbs.defaultProps = {
    rootPathLength: 2
};

Breadcrumbs.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    rootPathLength: PropTypes.number
};

export default withStyles(styles)(Breadcrumbs);
