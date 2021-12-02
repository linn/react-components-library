import React from 'react';
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import TextField from '@mui/material/TextField';
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

function Picker({ label, value, onChange, minDate, maxDate, required, disabled }) {
    const inputClasses = inputStyles();
    const labelClasses = labelStyles();
    return (
        <>
            <InputLabel classes={{ root: labelClasses.root }} required={required}>
                {label}
            </InputLabel>
            <DateTimePicker
                allowKeyboardControl
                autoOk
                margin="dense"
                inputVariant="outlined"
                ampm={false}
                renderInput={(props) => <TextField {...props} />}
                value={moment(value)}
                minDate={moment(minDate)}
                maxDate={moment(maxDate)}
                onChange={onChange}
                classes={inputClasses}
                className={inputClasses.root}
                disabled={disabled}
                InputAdornmentProps={{ className: inputClasses.root }}
                InputProps={{ classes: { disabled: inputClasses.disabled } }}
                format="DD/MM/YYYY HH:mm"
            />
        </>
    );
}

Picker.propTypes = {
    label: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool
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
