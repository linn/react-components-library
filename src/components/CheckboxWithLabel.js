import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import withStyles from '@mui/styles/withStyles';

const styles = {
    root: {
        width: '100%',
        fontSize: 14
    }
};

const CheckboxWithLabel = ({
    classes = {},
    checked = false,
    color = 'primary',
    label = '',
    onChange
}) => (
    <FormControlLabel
        label={label}
        classes={{ label: `${classes.root}` }}
        control={<Checkbox checked={checked} onChange={onChange} color={color} />}
    />
);

export default withStyles(styles)(CheckboxWithLabel);
