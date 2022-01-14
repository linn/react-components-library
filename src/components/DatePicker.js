import React from 'react';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';

const labelStyles = makeStyles((theme) => ({
    root: {
        fontSize: theme.typography.fontSize
    }
}));

const inputStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        fontSize: theme.typography.fontSize
    }
}));

function Picker({ value, minDate, maxDate, label, onChange, required, disabled }) {
    const inputClasses = inputStyles();
    const labelClasses = labelStyles();

    return (
        <>
            <InputLabel classes={{ root: labelClasses.root }} required={required}>
                {label}
            </InputLabel>
            <DatePicker
                allowKeyboardControl
                margin="dense"
                inputVariant="outlined"
                autoOk
                format="DD/MM/YYYY"
                renderInput={(props) => <TextField {...props} />}
                value={value ? moment(value) : null}
                minDate={moment(minDate)}
                maxDate={moment(maxDate)}
                onChange={onChange}
                classes={inputClasses}
                disabled={disabled}
                className={inputClasses.root}
                InputAdornmentProps={{ className: inputClasses.root }}
                InputProps={{ classes: { disabled: inputClasses.disabled } }}
            />
        </>
    );
}

Picker.propTypes = {
    label: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

Picker.defaultProps = {
    label: '',
    minDate: undefined,
    maxDate: undefined,
    required: false,
    value: new Date().toISOString(),
    disabled: false,
    onChange: () => {}
};

export default Picker;
