import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs';

const styles = () => ({
    root: {
        margin: 40,
        padding: 40
    }
});

const Page = ({ classes, children, history }) => (
    <Paper className={classes.root}>
        {<Breadcrumbs history={history} />}
        {children}
    </Paper>
);

Page.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Page);
