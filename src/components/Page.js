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

function Page({ children, history }) {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Breadcrumbs history={history} />
                </Grid>
                <Grid item xs={1} />
                {/* TODO would be good to have the mid width be a variable */}
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Paper className={classes.root} square>
                        {children}
                    </Paper>
                </Grid>
                <Grid item xs={1} />
            </Grid>
        </Fragment>
    );
}

Page.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({}).isRequired
};

export default Page;
