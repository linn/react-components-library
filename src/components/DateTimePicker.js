import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';

function Picker({
    label = '',
    value = new Date().toISOString(),
    onChange = () => {},
    minDate = undefined,
    maxDate = undefined,
    required = false,
    disabled = false
}) {
    return (
        <>
            <InputLabel sx={theme => theme.typography.fontSize} required={required}>
                {label}
            </InputLabel>
            <DateTimePicker
                ampm={false}
                value={moment(value)}
                minDate={moment(minDate)}
                maxDate={moment(maxDate)}
                onChange={onChange}
                disabled={disabled}
                format="DD/MM/YYYY HH:mm"
                slotProps={{
                    textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: 'small',
                        sx: {
                            mt: 1
                        }
                    }
                }}
            />
        </>
    );
}

export default Picker;
