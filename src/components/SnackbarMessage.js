import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

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
                >
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
