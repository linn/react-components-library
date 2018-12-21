import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginBottom: '20px',
        width: '100%'
    },
    typography: {
        fontSize: 16
    }
});

const Dropdown = ({ classes, label, items = [], onChange, value }) => (
    <FormControl className={`${classes.root} ${classes.typography}`}>
        <InputLabel className={classes.typography}>{label}</InputLabel>
        <Select
            className={classes.typography}
            value={value}
            onChange={onChange}
        >
            {items && items.map(item => (
                <MenuItem key={item} className={classes.typography} value={item}>{item}</MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default withStyles(styles)(Dropdown);