import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
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
                allowKeyboardControl
                autoOk
                margin="dense"
                inputVariant="outlined"
                ampm={false}
                renderInput={props => <TextField {...props} />}
                value={moment(value)}
                minDate={moment(minDate)}
                maxDate={moment(maxDate)}
                onChange={onChange}
                disabled={disabled}
                format="DD/MM/YYYY HH:mm"
                slotProps={{
                    textField: {
                        variant: 'outlined',
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
