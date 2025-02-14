import { useRef, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const hasValue = val => val || val === 0;
const getValue = val => (hasValue(val) ? val : '');

function InputField({
    onChange = null,
    propertyName,
    type = 'text',
    adornment = '',
    disabled = false,

    error = false,
    fullWidth = false,
    helperText = '',
    label = '',
    margin = 'dense',
    maxLength = null,
    rows = null,
    name = '',
    placeholder = '',
    required = false,
    value = '',
    decimalPlaces = null,
    textFieldProps = null,
    autoFocus = false,
    onErrorStateChange = null,
    visible = true
}) {
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
                sx={{
                    fontSize: theme => theme.typography.fontSize,
                    color: inErrorState ? theme => theme.palette.error.main : 'inherit',
                    '& .MuiInputLabel-asterisk': {
                        color: theme => theme.palette.error.main
                    }
                }}
                required={required}
                error={inErrorState}
                htmlFor={propertyName}
            >
                {label}
            </InputLabel>
            <TextField
                sx={{
                    paddingTop: 0,
                    marginTop: theme => theme.spacing(1),
                    '& .Mui-disabled': {
                        backgroundColor: theme => theme.palette.grey[100],
                        color: theme => theme.palette.text.secondary
                    }
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
                        inputRef.current.blur();
                    }
                }}
                type={type}
                value={getValue(value)}
                onChange={e => change(e)}
                InputProps={{
                    startAdornment: adornment ? (
                        <InputAdornment position="start">{adornment}</InputAdornment>
                    ) : null
                }}
                FormHelperTextProps={{
                    sx: {
                        color: inErrorState
                            ? theme => theme.palette.error.main
                            : theme => theme.palette.text.primary
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

export default InputField;
