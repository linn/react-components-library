import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function BackButton({ backClick, text }) {
    return (
        <div style={{ float: 'left' }}>
            <Button id="back-button" onClick={backClick}>
                {text || 'Back'}
            </Button>
        </div>
    );
}

BackButton.propTypes = {
    backClick: PropTypes.func.isRequired,
    text: PropTypes.string
};

BackButton.defaultProps = {
    text: null
};

export default BackButton;
