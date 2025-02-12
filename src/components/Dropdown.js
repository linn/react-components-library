import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

const hasValue = val => val || val === 0;

const getValue = val => (hasValue(val) ? val : '');

const hasDisplayText = items => items.some(item => item.displayText || item.displayText === '');

const includesValue = (value, items) => {
    if (hasDisplayText(items)) {
        return items.some(item => item.id === value);
    }

    return items.includes(value);
};

const getOptions = (items, allowNoValue, optionsLoading = false) => {
    if (optionsLoading) return ['loading...'];
    const options = items ? [...items] : [];
    if (allowNoValue) {
        if (hasDisplayText(items)) {
            options.push({ id: '', displayText: '' });
        } else {
            options.push('');
        }
    }
    return options;
};

function Dropdown({
    onChange,
    optionsLoading,
    propertyName,
    required,
    disabled,
    label,
    items,
    allowNoValue,
    value,
    helperText,
    fullWidth,
    adornment,
    type,
    error,
    margin,
    autoFocus
}) {
    const change = e => {
        const newValue = e.target.value;

        let val;

        if (type === 'number') {
            val = hasValue(newValue) ? parseFloat(newValue) : null;
        } else {
            val = hasValue(newValue) ? newValue : '';
        }

        onChange(propertyName, val);
    };

    return (
        <>
            <InputLabel
                sx={{
                    fontSize: theme => theme.typography.fontSize,
                    color: error ? theme => theme.palette.error.main : 'inherit',
                    '& .MuiInputLabel-asterisk': {
                        color: theme => theme.palette.error.main
                    }
                }}
                required={required}
                error={error}
                htmlFor={propertyName}
            >
                {label}
            </InputLabel>
            <TextField
                sx={{
                    paddingTop: 0,
                    marginTop: theme => theme.spacing(1),
                    '& .MuiInputBase-root.Mui-disabled': {
                        backgroundColor: theme => theme.palette.grey[100],
                        color: theme => theme.palette.text.secondary
                    }
                }}
                autoFocus={autoFocus}
                error={error}
                id={propertyName}
                type={type}
                select
                adornment={adornment}
                disabled={disabled}
                fullWidth={fullWidth}
                value={getValue(value)}
                onChange={e => change(e)}
                SelectProps={{
                    native: true
                }}
                size="small"
                helperText={helperText}
                margin={margin}
                variant="outlined"
                required={required}
                FormHelperTextProps={{
                    sx: {
                        color: error ? theme => theme.palette.error.main : 'inherit',
                        '&.Mui-required': {
                            color: theme => theme.palette.error.main
                        }
                    }
                }}
            >
                {hasDisplayText(items)
                    ? getOptions(items, allowNoValue, optionsLoading).map(item => (
                          <option key={item.id} value={item.id}>
                              {item.displayText}
                          </option>
                      ))
                    : getOptions(items, allowNoValue, optionsLoading).map(item => (
                          <option key={item} value={item}>
                              {item}
                          </option>
                      ))}
            </TextField>
        </>
    );
}

export default Dropdown;
