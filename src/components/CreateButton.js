import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function CreateButton({ createUrl, disabled }) {
    return (
        <Link to={createUrl} style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="outlined" sx={{ float: 'right' }} disabled={disabled}>
                Create
            </Button>
        </Link>
    );
}

export default CreateButton;
