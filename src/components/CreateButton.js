import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';

const styles = () => ({
    root: {
        float: 'right'
    }
});

function CreateButton({ createUrl, classes, disabled }) {
    return (
        <Link to={createUrl}>
            <Button color="primary" variant="outlined" className={classes.root} disabled={disabled}>
                Create
            </Button>
        </Link>
    );
}

CreateButton.propTypes = {
    createUrl: PropTypes.string.isRequired,
    classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
    disabled: PropTypes.bool
};

CreateButton.defaultProps = {
    disabled: false
};

export default withStyles(styles)(CreateButton);
