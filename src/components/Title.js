import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Title = ({ text }) => (
    <Typography variant="h4" gutterBottom>
        {text}
    </Typography>
);

Title.propTypes = {
    text: PropTypes.string.isRequired
};

export default Title;
