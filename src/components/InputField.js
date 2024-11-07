/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import makeStyles from '@mui/styles/makeStyles';

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
    useEffect(() => {
        setTimeout(() => {
            if (!autoFocus || !inputRef.current || !visible) return;
            inputRef.current.focus();
        }, 100);
    }, [autoFocus, visible]);

    useEffect(() => {
        setInErrorState(error);
    }, [error]);
    const change = e => {
        const newValue = e.target.value;

        let val = newValue;

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
        } else if (maxLength && newValue?.length > maxLength) {
            setInErrorState(true);
            setErrorMessage(`MAX LENGTH (${maxLength}) EXCEEDED`);
            if (onErrorStateChange) {
                onErrorStateChange(true);
            }
        } else if (maxLength && newValue?.length <= maxLength) {
            setInErrorState(false);
            if (onErrorStateChange) {
                onErrorStateChange(false);
            }
            setErrorMessage('');
        }

        onChange(propertyName, val);
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
                onWheel={() => {
                    if (type === 'number') {
                        inputRef.blur();
                    }
                }}
                type={type}
                value={getValue(value)}
                onChange={e => change(e)}
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
                onInput={e => {
                    if (type === 'number' && maxLength) {
                        e.target.value = e.target.value.slice(0, maxLength);
                    }
                }}
                variant="outlined"
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
    decimalPlaces: null,
    textFieldProps: null,
    autoFocus: false,
    onErrorStateChange: null,
    visible: true
};

export default InputField;
