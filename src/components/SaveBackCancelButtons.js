import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function SaveBackCancelButtons({
    saveClick,
    cancelClick,
    saveDisabled = false,
    backClick,
    showBackButton = true,
    showCancelButton = false
}) {
    const handleClick = () => {
        if (saveDisabled && !showCancelButton) {
            backClick();
        } else {
            cancelClick();
        }
    };

    return (
        <Box sx={{ float: 'right' }}>
            {(!saveDisabled || showBackButton || showCancelButton) && (
                <Button
                    id="cancel-button"
                    onClick={() => handleClick()}
                    variant="outlined"
                    sx={{ marginRight: theme => theme.spacing(1) }}
                >
                    {saveDisabled && !showCancelButton ? 'Back' : 'Cancel'}
                </Button>
            )}
            <Button
                id="save-button"
                variant="contained"
                color="primary"
                onClick={() => saveClick()}
                disabled={saveDisabled}
            >
                Save
            </Button>
        </Box>
    );
}

export default SaveBackCancelButtons;
