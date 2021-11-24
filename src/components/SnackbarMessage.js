import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
}));

function SnackbarMessage({ message, visible, onClose, timeOut }) {
    const classes = useStyles();
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            ContentProps={{
                classes: {
                    root: classes.root
                }
            }}
            open={visible}
            autoHideDuration={timeOut}
            onClose={() => onClose(false)}
            message={message}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => onClose(false)}
                    size="large">
                    <CloseIcon />
                </IconButton>
            ]}
        />
    );
}

SnackbarMessage.propTypes = {
    classes: PropTypes.shape({}),
    message: PropTypes.string.isRequired,
    timeOut: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

SnackbarMessage.defaultProps = {
    classes: {},
    timeOut: 3000,
    visible: false
};

export default SnackbarMessage;
