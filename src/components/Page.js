import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/styles/makeStyles';
import React, { Fragment } from 'react';
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
        marginTop: theme.spacing(4)
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
    xl: 0
};

function Page({ children, history, width }) {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Breadcrumbs history={history} />
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
        </Fragment>
    );
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({}).isRequired,
    width: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
};

Page.defaultProps = {
    width: 'l'
};

export default Page;
