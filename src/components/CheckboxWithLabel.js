import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
    root: {
        width: '100%',
        fontSize: 14
    }
};

const CheckboxWithLabel = ({ classes, checked, color = 'primary', label, onChange }) => (
    <FormControlLabel
        label={label}
        classes={{ label: `${classes.root}` }}
        control={<Checkbox checked={checked} onChange={onChange} color={color} />}
    />
);

CheckboxWithLabel.propTypes = {
    classes: PropTypes.shape({}),
    checked: PropTypes.bool,
    color: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

CheckboxWithLabel.defaultProps = {
    classes: {},
    checked: false,
    color: 'primary',
    label: ''
};

export default withStyles(styles)(CheckboxWithLabel);
