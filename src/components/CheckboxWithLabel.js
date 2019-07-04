import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/styles/withStyles';
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
