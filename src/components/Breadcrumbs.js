import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
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

const Slash = () => <Fragment> {' / '} </Fragment>;

class Breadcrumbs extends Component {
    render() {
        const { classes, history, rootPathLength = 2 } = this.props;

        let path = history.location.pathname;
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }
        const crumbs = path
            .split('/')
            .filter(x => x !== 'report')
            .reduce((sofar, crumb, i, list) => {
                path = list.slice(0, i + 1);
                const href = path.join('/') || '/';
                const handleClick = e => {
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
                <Typography variant="button" gutterBottom>
                    {crumbs.map((crumb, index) => (
                        <Fragment key={crumb.caption}>
                            {index < crumbs.length - 1 ? (
                                <span>
                                    <NavLink className={classes.a} to={crumb.href}>
                                        <strong>{crumb.caption}</strong>
                                    </NavLink>
                                    <Slash />
                                </span>
                            ) : (
                                <span>
                                    <strong>{crumb.caption}</strong>
                                </span>
                            )}
                        </Fragment>
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
