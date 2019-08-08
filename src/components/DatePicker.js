import React, { Fragment } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const labelStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        fontSize: theme.typography.fontSize
    }
}));

const inputStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        fontSize: theme.typography.fontSize
    }
}));

function DatePicker({ value, minDate, maxDate, label, onChange, required }) {
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
                format="DD/MM/YYYY"
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                onChange={onChange}
                classes={inputClasses}
                className={inputClasses.root}
                InputAdornmentProps={{ className: inputClasses.root }}
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
    value: PropTypes.string
};

DatePicker.defaultProps = {
    label: '',
    minDate: undefined,
    maxDate: undefined,
    required: false,
    value: new Date().toISOString()
};
export default DatePicker;
