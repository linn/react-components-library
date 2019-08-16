import React, { Fragment } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const labelStyles = makeStyles(theme => ({
    root: {
        fontSize: theme.typography.fontSize
    }
}));

const inputStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        fontSize: theme.typography.fontSize
    },
    disabled: {
        background: theme.palette.grey[100],
        color: theme.palette.text.secondary
    }
}));

function DatePicker({ value, minDate, maxDate, label, onChange, required, disabled }) {
    const inputClasses = inputStyles();
    const labelClasses = labelStyles();
    return (
        <Fragment>
            <InputLabel classes={{ root: labelClasses.root }} required={required}>
                {label}
            </InputLabel>
            <KeyboardDatePicker
                allowKeyboardControl
                margin="dense"
                inputVariant="outlined"
                autoOk
                fullwidth
                format="DD/MM/YYYY"
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={onChange}
                classes={inputClasses}
                disabled={disabled}
                className={inputClasses.root}
                InputAdornmentProps={{ className: inputClasses.root }}
                InputProps={{ classes: { disabled: inputClasses.disabled } }}
            />
        </Fragment>
    );
}

DatePicker.propTypes = {
    label: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool
};

DatePicker.defaultProps = {
    label: '',
    minDate: undefined,
    maxDate: undefined,
    required: false,
    value: new Date().toISOString(),
    disabled: false
};

export default DatePicker;
