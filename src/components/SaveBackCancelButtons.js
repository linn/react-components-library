import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function SaveBackCancelButtons({
    saveClick,
    cancelClick,
    saveDisabled = false,
    backClick,
    showBackButton = true,
    editStatus = null,
    saveButtonLabelText = 'Save'
}) {
    const editing = editStatus === 'edit' || editStatus === 'create';

    const handleClick = () => {
        if (saveDisabled && !editing) {
            backClick();
        } else {
            cancelClick();
        }
    };

    return (
        <Box sx={{ float: 'right' }}>
            {(!saveDisabled || showBackButton || editing) && (
                <Button
                    id="cancel-button"
                    onClick={() => handleClick()}
                    variant="outlined"
                    sx={{ marginRight: theme => theme.spacing(1) }}
                >
                    {saveDisabled && !editing ? 'Back' : 'Cancel'}
                </Button>
            )}
            <Button
                id="save-button"
                variant="contained"
                color="primary"
                onClick={() => saveClick()}
                disabled={saveDisabled}
            >
                {saveButtonLabelText}
            </Button>
        </Box>
    );
}

export default SaveBackCancelButtons;
