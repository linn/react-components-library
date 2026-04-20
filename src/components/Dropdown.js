import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const hasValue = val => val || val === 0;

const getValue = val => (hasValue(val) ? val : '');

const hasDisplayText = items => items.some(item => item.displayText || item.displayText === '');

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

const getSelectableItems = (items, currentValue) => {
    if (!items) return items;
    const filtered = items.filter(item => item.hideFromEdit !== 'Y');
    // If the current value is a hidden item, include it so it still displays correctly
    const currentItem = items.find(
        item => (item.id !== undefined ? item.id : item) === currentValue
    );
    if (currentItem && currentItem.hideFromEdit === 'Y') {
        return [currentItem, ...filtered];
    }
    return filtered;
};

function Dropdown({
    onChange,
    optionsLoading = false,
    propertyName,
    required = false,
    disabled = false,
    label = '',
    items = [],
    allowNoValue = true,
    value = '',
    helperText = '',
    fullWidth = false,
    adornment = '',
    type = 'text',
    error = false,
    margin = 'dense',
    autoFocus = false
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

    const selectableItems = getSelectableItems(items, value);

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
                    marginTop: theme => theme.spacing(1)
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
                {hasDisplayText(selectableItems)
                    ? getOptions(selectableItems, allowNoValue, optionsLoading).map(item => (
                          <option key={item.id} value={item.id}>
                              {item.displayText}
                          </option>
                      ))
                    : getOptions(selectableItems, allowNoValue, optionsLoading).map(item => (
                          <option key={item} value={item}>
                              {item}
                          </option>
                      ))}
            </TextField>
        </>
    );
}

export default Dropdown;
