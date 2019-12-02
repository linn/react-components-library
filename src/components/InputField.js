import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import makeStyles from '@material-ui/styles/makeStyles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 0,
        marginTop: theme.spacing(1)
    },
    disabled: {
        background: theme.palette.grey[100],
        color: theme.palette.text.secondary
    },
    label: {
        fontSize: theme.typography.fontSize
    },
    labelAsterisk: {
        color: theme.palette.error.main
    },
    required: {
        color: theme.palette.error.main
    },
    error: {
        color: theme.palette.error.main
    }
}));

const hasValue = val => val || val === 0;
const getValue = val => (hasValue(val) ? val : '');

function InputField({
    onChange,
    propertyName,
    type,
    adornment,
    disabled,
    error,
    fullWidth,
    helperText,
    label,
    margin,
    maxLength,
    rows,
    name,
    placeholder,
    required,
    value,
    decimalPlaces,
    textFieldProps
}) {
    const classes = useStyles();

    const change = e => {
        const newValue = e.target.value;

        let val = newValue;

        if (type === 'date') {
            val = newValue
                ? moment(newValue)
                      .utc()
                      .format()
                : '';
        }

        if (type === 'number') {
            val = hasValue(newValue) ? parseFloat(newValue) : null;

            if (
                val &&
                decimalPlaces &&
                newValue.indexOf('.') < newValue.length - decimalPlaces &&
                newValue.indexOf('.') !== -1
            ) {
                val = parseFloat(newValue.slice(0, newValue.indexOf('.') + decimalPlaces + 1));
            }
        }

        onChange(propertyName, val);
    };

    return (
        <Fragment>
            <InputLabel
                classes={{ root: classes.label, asterisk: classes.labelAsterisk }}
                required={required}
                error={error}
            >
                {label}
            </InputLabel>
            <TextField
                classes={{
                    root: classes.root
                }}
                disabled={disabled}
                error={error}
                fullWidth={fullWidth}
                helperText={helperText}
                margin={margin}
                multiline={rows > 0}
                name={name}
                placeholder={placeholder}
                required={required}
                rows={rows}
                type={type}
                value={type === 'date' ? moment(value).format('YYYY-MM-DD') : getValue(value)}
                onChange={e => change(e)}
                InputProps={{
                    startAdornment: adornment ? (
                        <InputAdornment position="start">{adornment}</InputAdornment>
                    ) : null,
                    inputProps: {
                        maxLength
                    },
                    classes: {
                        disabled: classes.disabled
                    }
                }}
                FormHelperTextProps={{
                    classes: {
                        required: classes.required,
                        error: classes.error
                    }
                }}
                onInput={e => {
                    if (type === 'number' && maxLength) {
                        e.target.value = e.target.value.slice(0, maxLength);
                    }
                }}
                variant="outlined"
                {...textFieldProps}
            />
        </Fragment>
    );
}

InputField.propTypes = {
    adornment: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    margin: PropTypes.string,
    maxLength: PropTypes.number,
    required: PropTypes.bool,
    rows: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    propertyName: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    decimalPlaces: PropTypes.number,
    textFieldProps: PropTypes.shape({})
};

InputField.defaultProps = {
    adornment: '',
    disabled: false,
    error: false,
    fullWidth: false,
    helperText: '',
    label: '',
    margin: 'dense',
    maxLength: null,
    required: false,
    rows: null,
    name: '',
    placeholder: '',
    propertyName: '',
    type: 'text',
    value: '',
    onChange: null,
    decimalPlaces: null,
    textFieldProps: null
};

export default InputField;
