import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Error from '@mui/icons-material/Error';
import { ThemeProvider } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import errorTheme from '../themes/errorTheme';

const styles = () => ({
    root: {
        justifyContent: 'center',
        width: '50%',
        margin: 'auto',
        padding: 10
    },
    icon: {
        marginRight: 5,
        float: 'right'
    },
    typography: {
        fontSize: 16
    },
    details: {
        fontSize: 12,
        marginTop: '10px'
    }
});

const ErrorCard = ({ classes, errorMessage, detailLines }) => (
    <ThemeProvider theme={errorTheme}>
        <Card className={classes.root}>
            <Error color="error" className={classes.icon} />
            <Typography align="center" className={classes.typography}>
                {errorMessage}
            </Typography>
            <div className={classes.details}>
                {detailLines?.map(d => (
                    <Typography
                        key={d.descriptor}
                        align="center"
                    >{`${d.descriptor} - ${d.message}`}</Typography>
                ))}
            </div>
        </Card>
    </ThemeProvider>
);

ErrorCard.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        icon: PropTypes.string,
        typography: PropTypes.string,
        details: PropTypes.string
    }),
    detailLines: PropTypes.arrayOf(
        PropTypes.shape({ descriptor: PropTypes.string, message: PropTypes.string })
    ),
    errorMessage: PropTypes.string.isRequired
};

ErrorCard.defaultProps = {
    classes: {},
    detailLines: []
};

export default withStyles(styles)(ErrorCard);
