import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

function AutoComplete({
    label,
    options = [],
    value = null,
    onChange,
    getOptionLabel,
    isOptionEqualToValue,
    matchesInput,
    idField,
    labelField,
    required = false,
    disabled = false,
    disableClearable = false
}) {
    const [inputValue, setInputValue] = useState(null);

    // Convenience mode: when idField/labelField are supplied the three option callbacks are derived
    // from them, and `value`/`onChange` speak the plain id (not the option object) — so a caller passing
    // a coded list just gives the field names and works in ids. Omit them for the original object-mode
    // API where the caller supplies the callbacks and the value/onChange are the whole option object.
    const resolvedGetOptionLabel =
        getOptionLabel ??
        (labelField
            ? option => option?.[labelField] ?? (idField ? String(option[idField]) : '')
            : option => `${option ?? ''}`);

    const resolvedIsOptionEqualToValue =
        isOptionEqualToValue ??
        (idField ? (option, selected) => option?.[idField] === selected?.[idField] : undefined);

    const resolvedMatchesInput =
        matchesInput ??
        (idField ? (option, typed) => String(option?.[idField]) === typed : undefined);

    // In id mode, resolve the incoming id to its option object for display and emit the id back out.
    const selectedOption = idField
        ? (options.find(option => option?.[idField] === value) ?? null)
        : value;
    const emitChange = idField ? option => onChange(option?.[idField] ?? null) : onChange;

    const optionLabel = option => resolvedGetOptionLabel(option);

    const handleBlur = () => {
        const typedValue = inputValue?.trim();
        if (typedValue) {
            const matchingOption = options.find(
                option =>
                    optionLabel(option).toUpperCase() === typedValue.toUpperCase() ||
                    resolvedMatchesInput?.(option, typedValue)
            );
            if (matchingOption) emitChange(matchingOption);
        }
        setInputValue(null);
    };

    return (
        <Autocomplete
            size="small"
            autoHighlight
            autoSelect
            disableClearable={disableClearable}
            options={options}
            value={selectedOption}
            inputValue={inputValue ?? (selectedOption ? optionLabel(selectedOption) : '')}
            getOptionLabel={optionLabel}
            isOptionEqualToValue={resolvedIsOptionEqualToValue}
            onChange={(_, option) => {
                emitChange(option);
                setInputValue(null);
            }}
            onInputChange={(_, newValue, reason) => {
                if (reason === 'input') setInputValue(newValue);
                if (reason === 'clear') setInputValue('');
            }}
            onBlur={handleBlur}
            disabled={disabled}
            renderInput={params => (
                <>
                    <InputLabel
                        required={required}
                        sx={{
                            fontSize: theme => theme.typography.fontSize,
                            color: 'inherit',
                            '& .MuiInputLabel-asterisk': {
                                color: theme => theme.palette.error.main
                            }
                        }}
                        htmlFor={params.id}
                    >
                        {label}
                    </InputLabel>
                    <TextField
                        {...params}
                        sx={{ paddingTop: 0, marginTop: theme => theme.spacing(1) }}
                        margin="dense"
                        size="small"
                        required={required}
                        variant="outlined"
                    />
                </>
            )}
        />
    );
}

export default AutoComplete;
