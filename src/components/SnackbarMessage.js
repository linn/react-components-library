import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

function SnackbarMessage({ message, visible, onClose, timeOut }) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            ContentProps={{
                sx: {
                    backgroundColor: theme => theme.palette.primary.main
                }
            }}
            open={visible}
            autoHideDuration={timeOut}
            onClose={() => onClose(false)}
            message={message}
            action={
                <IconButton
                    aria-label="Close"
                    color="inherit"
                    onClick={() => onClose(false)}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            }
        />
    );
}

SnackbarMessage.propTypes = {
    message: PropTypes.string.isRequired,
    timeOut: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired
};

SnackbarMessage.defaultProps = {
    timeOut: 3000,
    visible: false
};

export default SnackbarMessage;
