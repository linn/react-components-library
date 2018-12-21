import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '100%',
        fontSize: 14
    }
}

const CheckboxWithLabel = ({ classes, checked, color = 'primary', label, onChange }) => (
    <FormControlLabel
        label={label}
        classes={{ label: `${classes.root}` }}
        control={
            <Checkbox
                checked={checked}
                onChange={onChange}
                color={color}
            />
        }
    />
)

export default withStyles(styles)(CheckboxWithLabel);