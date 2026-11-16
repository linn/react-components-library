import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';

function Picker({
    value = new Date().toISOString(),
    minDate = null,
    maxDate = null,
    label = '',
    onChange = () => {},
    required = false,
    disabled = false,
    propertyName = '',
    datePickerProps = null
}) {
    return (
        <>
            {/* same label as InputField (and LinnWeekPicker), so they line up side by side */}
            <InputLabel
                sx={{
                    fontSize: theme => theme.typography.fontSize,
                    color: 'inherit',
                    '& .MuiInputLabel-asterisk': {
                        color: theme => theme.palette.error.main
                    }
                }}
                required={required}
                htmlFor={propertyName || undefined}
            >
                {label}
            </InputLabel>
            <DatePicker
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        id: propertyName || undefined,
                        variant: 'outlined',
                        fullWidth: true,
                        size: 'small',
                        margin: 'dense',
                        sx: {
                            paddingTop: 0,
                            marginTop: theme => theme.spacing(1)
                        }
                    }
                }}
                value={value ? moment(value) : null}
                minDate={minDate ? moment(minDate) : null}
                maxDate={maxDate ? moment(maxDate) : null}
                onChange={onChange}
                disabled={disabled}
                {...datePickerProps}
            />
        </>
    );
}

export default Picker;
