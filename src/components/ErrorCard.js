import React from 'react';
import { Typography, Card } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { errorTheme } from '../themes/index';

const styles = () => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        margin: 'auto',
        padding: 10
    },
    icon:{
        marginRight: 5
    },
    typography: {
        fontSize: 16
    }
});

const ErrorCard = ({ classes, errorMessage }) => (
    <MuiThemeProvider theme={errorTheme}>
        <Card className={classes.root}>
            <Error color="error" className={classes.icon} />
            <Typography align="center" className={classes.typography}>
                {errorMessage}
            </Typography>
        </Card>
    </MuiThemeProvider>
);

ErrorCard.propTypes = {
    classes: PropTypes.shape({}),
    errorMessage: PropTypes.string.isRequired
};

ErrorCard.defaultProps = {
    classes: {}
};

export default withStyles(styles)(ErrorCard);