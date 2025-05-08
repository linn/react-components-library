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
    datePickerProps = null
}) {
    return (
        <>
            <InputLabel sx={theme => theme.typography.fontSize} required={required}>
                {label}
            </InputLabel>
            <DatePicker
                allowKeyboardControl
                margin="dense"
                inputVariant="outlined"
                autoOk
                format="DD/MM/YYYY"
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
