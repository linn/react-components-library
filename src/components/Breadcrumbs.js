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

const Slash = () => <> {' / '} </>;

function Breadcrumbs({ history, rootPathLength, homeUrl }) {
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

            return crumb
                ? [...sofar, { key: i, caption: crumb, href, onClick: e => handleClick(e) }]
                : sofar;
        }, []);

    return (
        <div className={classes.root}>
            <>
                <Link key="home" href={homeUrl} classes={{ root: classes.link }} variant="button">
                    HOME
                </Link>
                <Slash />
            </>
            {crumbs.map((crumb, index) => {
                if (index < crumbs.length - 1) {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={index}>
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
                    // eslint-disable-next-line react/no-array-index-key
                    <Typography display="inline" variant="button" key={index}>
                        {crumb.caption}
                    </Typography>
                );
            })}
        </div>
    );
}

Breadcrumbs.defaultProps = {
    rootPathLength: 2,
    homeUrl: PropTypes.string
};

Breadcrumbs.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
        location: PropTypes.shape({ pathname: PropTypes.string })
    }).isRequired,
    rootPathLength: PropTypes.number,
    homeUrl: 'https://app.linn.co.uk'
};

export default Breadcrumbs;
