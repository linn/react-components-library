import React, { Fragment } from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
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
    }
}));

function DateTimePicker({ label, value, onChange, minDate, maxDate, required, disabled }) {
    const inputClasses = inputStyles();
    const labelClasses = labelStyles();
    return (
        <Fragment>
            <InputLabel classes={{ root: labelClasses.root }} required={required}>
                {label}
            </InputLabel>
            <KeyboardDateTimePicker
                allowKeyboardControl
                autoOk
                margin="dense"
                inputVariant="outlined"
                ampm={false}
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={onChange}
                classes={inputClasses}
                className={inputClasses.root}
                disabled={disabled}
                InputAdornmentProps={{ className: inputClasses.root }}
                InputProps={{ classes: { disabled: inputClasses.disabled } }}
                format="DD/MM/YYYY HH:mm"
            />
        </Fragment>
    );
}

DateTimePicker.propTypes = {
    label: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool
};

DateTimePicker.defaultProps = {
    label: '',
    minDate: undefined,
    maxDate: undefined,
    required: false,
    value: new Date().toISOString(),
    disabled: false,
    onChange: () => {}
};

export default DateTimePicker;
