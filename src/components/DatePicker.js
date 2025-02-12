import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import moment from 'moment';

function Picker({ value, minDate, maxDate, label, onChange, required, disabled, datePickerProps }) {
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
