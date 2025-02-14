import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function SaveBackCancelButtons({
    saveClick,
    cancelClick,
    saveDisabled = false,
    backClick,
    showBackButton = true
}) {
    const handleClick = () => {
        if (saveDisabled) {
            backClick();
        } else {
            cancelClick();
        }
    };

    return (
        <Box sx={{ float: 'right' }}>
            {(!saveDisabled || showBackButton) && (
                <Button
                    id="cancel-button"
                    onClick={() => handleClick()}
                    variant="outlined"
                    sx={{ marginRight: theme => theme.spacing(1) }}
                >
                    {saveDisabled ? 'Back' : 'Cancel'}
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
