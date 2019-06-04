import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
    root: {
        float: 'right'
    }
});

const CreateButton = ({ createUrl, classes, disabled }) => (
    <Link to={createUrl}>
        <Button color="primary" variant="outlined" className={classes.root} disabled={disabled}>
            Create
        </Button>
    </Link>
);

CreateButton.propTypes = {
    createUrl: PropTypes.string.isRequired,
    classes: PropTypes.shape({}).isRequired,
    disabled: PropTypes.bool
};

CreateButton.defaultProps = {
    disabled: false
};

export default withStyles(styles)(CreateButton);
