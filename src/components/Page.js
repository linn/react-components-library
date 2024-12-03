import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    breadcrumbs: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        padding: theme.spacing(2)
    },
    grid: {
        marginTop: theme.spacing(4),
        width: '100%'
    }
}));

const pageWidth = {
    xs: 4,
    s: 6,
    m: 8,
    l: 10,
    xl: 12
};

const columnWidth = {
    xs: 4,
    s: 3,
    m: 2,
    l: 1,
    xl: false
};

function Page({
    children,
    navigate,
    location,
    width,
    requestErrors,
    showRequestErrors,
    homeUrl,
    showBreadcrumbs,
    title,
    defaultAppTitle
}) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (requestErrors && showRequestErrors) {
            requestErrors.forEach(t => {
                enqueueSnackbar(`${t.message} - ${t.type}`, {
                    variant: 'error',
                    preventDuplicate: true
                });
            });
        }
    }, [requestErrors, enqueueSnackbar]);

    useEffect(() => {
        if (title) {
            document.title = title;
        }
        return () => {
            if (defaultAppTitle) {
                document.title = defaultAppTitle;
            }
        };
    }, [title]);

    return (
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={1} />
            <Grid item xs={10} className="hide-when-printing">
                {showBreadcrumbs && (
                    <Breadcrumbs navigate={navigate} homeUrl={homeUrl} location={location} />
                )}
            </Grid>
            <Grid item xs={1} />

            <Grid item xs={columnWidth[width]} />
            <Grid item xs={pageWidth[width]}>
                <Paper className={classes.root} square>
                    {children}
                </Paper>
            </Grid>
            <Grid item xs={columnWidth[width]} />
        </Grid>
    );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    navigate: PropTypes.func,
    width: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
    showRequestErrors: PropTypes.bool,
    requestErrors: PropTypes.arrayOf(PropTypes.shape({})),
    homeUrl: PropTypes.string,
    showBreadcrumbs: PropTypes.bool,
    title: PropTypes.string,
    defaultAppTitle: PropTypes.string,
    location: PropTypes.shape({})
};

Page.defaultProps = {
    width: 'l',
    showRequestErrors: false,
    requestErrors: [],
    homeUrl: null,
    showBreadcrumbs: true,
    title: null,
    defaultAppTitle: null,
    navigate: null,
    location: null
};

export default Page;
