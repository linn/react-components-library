import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    },
    link: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const Slash = () => <Fragment> {' / '} </Fragment>;

function Breadcrumbs({ history, rootPathLength }) {
    const classes = useStyles();

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
            {crumbs.map((crumb, index) => {
                if (index < crumbs.length - 1) {
                    return (
                        <Fragment>
                            <Link
                                key={crumb.href}
                                to={crumb.href}
                                classes={{ root: classes.link }}
                                variant="button"
                                onClick={crumb.onClick}
                            >
                                {crumb.caption}
                            </Link>
                            <Slash />
                        </Fragment>
                    );
                }
                return (
                    <Typography display="inline" variant="button">
                        {crumb.caption}
                    </Typography>
                );
            })}
        </div>
    );
}

Breadcrumbs.defaultProps = {
    rootPathLength: 2
};

Breadcrumbs.propTypes = {
    history: PropTypes.shape({}).isRequired,
    rootPathLength: PropTypes.number
};

export default Breadcrumbs;
