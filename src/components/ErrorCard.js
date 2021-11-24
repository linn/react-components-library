import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Error from '@mui/icons-material/Error';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
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
    icon: {
        marginRight: 5
    },
    typography: {
        fontSize: 16
    }
});

const ErrorCard = ({ classes, errorMessage }) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={errorTheme}>
            <Card className={classes.root}>
                <Error color="error" className={classes.icon} />
                <Typography align="center" className={classes.typography}>
                    {errorMessage}
                </Typography>
            </Card>
        </ThemeProvider>
    </StyledEngineProvider>
);

ErrorCard.propTypes = {
    classes: PropTypes.shape({}),
    errorMessage: PropTypes.string.isRequired
};

ErrorCard.defaultProps = {
    classes: {}
};

export default withStyles(styles)(ErrorCard);
