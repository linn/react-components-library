import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import makeStyles from '@mui/styles/makeStyles';
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
    textFieldProps,
    autoFocus,
    onErrorStateChange,
    visible
}) {
    const classes = useStyles();
    const inputRef = useRef();
    const [inErrorState, setInErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        setTimeout(() => {
            if (!autoFocus || !inputRef.current || !visible) return;
            inputRef.current.focus();
        }, 100);
    }, [autoFocus, visible]);

    useEffect(() => {
        setInErrorState(error);
    }, [error]);

    const isNumber = val => {
        const validNumberPattern = /^-?\d+(\.\d+)?$/;
        return validNumberPattern.test(val);
    };

    const isPartial = val => {
        const validPartialPattern = /^-?\d*\.?$/;
        return validPartialPattern.test(val);
    };

    const handleChange = e => {
        const newValue = e.target.value;

        if (type === 'number' && !disabled) {
            setInErrorState(false);
            setErrorMessage(null);
            if (onErrorStateChange) {
                onErrorStateChange(true);
            }
            if (isNumber(newValue) || isPartial(newValue)) {
                if (maxLength) {
                    e.target.value = e.target.value.slice(0, maxLength);
                }

                setInputValue(newValue);

                if (decimalPlaces && newValue.includes('.')) {
                    const parts = newValue.split('.');
                    if (parts[1]?.length > decimalPlaces) {
                        setInErrorState(true);
                        setErrorMessage(`Max ${decimalPlaces} decimal places allowed.`);
                        if (onErrorStateChange) {
                            onErrorStateChange(true);
                        }
                    } else {
                        setInErrorState(false);
                        setErrorMessage('');
                        if (onErrorStateChange) {
                            onErrorStateChange(false);
                        }
                    }
                }
            } else {
                setInErrorState(true);
                setErrorMessage('Invalid number format.');
                if (onErrorStateChange) {
                    onErrorStateChange(true);
                }
            }
        } else {
            setInputValue(newValue);
        }
    };

    const handleBlur = () => {
        if (type === 'number') {
            let finalValue = inputValue.endsWith('.') ? inputValue.slice(0, -1) : inputValue;
            finalValue = isNumber(finalValue) ? parseFloat(finalValue) : 0;
            onChange(propertyName, finalValue);
        } else {
            onChange(propertyName, inputValue);
        }
    };

    return (
        <>
            <InputLabel
                classes={{ root: classes.label, asterisk: classes.labelAsterisk }}
                required={required}
                error={inErrorState}
                htmlFor={propertyName}
            >
                {label}
            </InputLabel>
            <TextField
                classes={{
                    root: classes.root
                }}
                disabled={disabled}
                error={inErrorState}
                fullWidth={fullWidth}
                helperText={inErrorState ? errorMessage : helperText}
                margin={margin}
                multiline={rows > 0}
                name={name}
                id={propertyName}
                placeholder={placeholder}
                required={required}
                size="small"
                rows={rows}
                inputRef={inputRef}
                type={type === 'number' && !disabled ? 'text' : type}
                value={type === 'date' ? moment(value).format('YYYY-MM-DD') : getValue(inputValue)}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                    startAdornment: adornment ? (
                        <InputAdornment position="start">{adornment}</InputAdornment>
                    ) : null,
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
                variant="outlined"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...textFieldProps}
            />
        </>
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
    propertyName: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    decimalPlaces: PropTypes.number,
    textFieldProps: PropTypes.shape({}),
    autoFocus: PropTypes.bool,
    onErrorStateChange: PropTypes.func,
    visible: PropTypes.bool
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
    type: 'text',
    value: '',
    onChange: null,
    decimalPlaces: 2,
    textFieldProps: null,
    autoFocus: false,
    onErrorStateChange: null,
    visible: true
};

export default InputField;
