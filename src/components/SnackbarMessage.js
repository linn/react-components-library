import React from 'react';
import PropTypes from 'prop-types';
import Snackbar  from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    }
});

function SnackbarMessage({ classes, message, visible, onClose, timeOut }) {
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

export default withStyles(styles)(SnackbarMessage);
