import React from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ConfirmDialog({
    visible,
    title,
    confirmButtonText,
    cancelButtonText,
    primaryText,
    secondaryText,
    onConfirm,
    maxWidth,
    onCancel,
    closeDialog
}) {
    return (
        <Dialog open={visible} fullWidth maxWidth={maxWidth}>
            <DialogTitle variant="h4">{title}</DialogTitle>

            <DialogContent dividers>
                {primaryText && <Typography variant="h6">{primaryText}</Typography>}
                {secondaryText && <Typography>{secondaryText}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        closeDialog();
                        onCancel?.();
                    }}
                    variant="outlined"
                >
                    {cancelButtonText}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        closeDialog();
                        onConfirm();
                    }}
                >
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    maxWidth: PropTypes.string,
    onCancel: PropTypes.func,
    closeDialog: PropTypes.func.isRequired
};

ConfirmDialog.defaultProps = {
    title: 'Are you sure?',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    primaryText: null,
    secondaryText: null,
    maxWidth: 'm',
    onCancel: null
};

export default ConfirmDialog;
