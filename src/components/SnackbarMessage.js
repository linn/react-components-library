import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

function SnackbarMessage({ message, visible = false, onClose, timeOut = 3000 }) {
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

export default SnackbarMessage;
