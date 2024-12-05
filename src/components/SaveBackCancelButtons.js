import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function SaveBackCancelButtons({
    saveClick,
    cancelClick,
    saveDisabled,
    backClick,
    showBackButton
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

SaveBackCancelButtons.propTypes = {
    saveClick: PropTypes.func.isRequired,
    cancelClick: PropTypes.func.isRequired,
    backClick: PropTypes.func.isRequired,
    saveDisabled: PropTypes.bool,
    showBackButton: PropTypes.bool
};

SaveBackCancelButtons.defaultProps = {
    saveDisabled: false,
    showBackButton: true
};

export default SaveBackCancelButtons;
