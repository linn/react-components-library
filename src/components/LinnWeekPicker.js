import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import { getWeekStartDate, getWeekEndDate } from '../utilities/dateUtilities';

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: prop =>
        prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay'
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark
        }
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%'
    }),
    ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%'
    })
}));

export default function LinnWeekPicker({
    selectedDate = new Date(),
    setWeekStartDate,
    propertyName = '',
    label = '',
    disabled = false,
    required = false
}) {
    const handleChange = date => {
        setWeekStartDate(propertyName, getWeekStartDate(date));
    };

    const renderWeekPickerDay = (date, _, pickersDayProps) => {
        if (!selectedDate) {
            return <PickersDay {...pickersDayProps} />;
        }

        const start = moment(getWeekStartDate(selectedDate));
        const end = moment(getWeekEndDate(selectedDate));

        const dayIsBetween = moment(date).isBetween(start, end, null, '[]');
        const isFirstDay = moment(date).isSame(start, 'day');
        const isLastDay = moment(date).isSame(end, 'day');

        return (
            <CustomPickersDay
                {...pickersDayProps}
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    return (
        <>
            {label && (
                <InputLabel required={required} sx={{ fontSize: '1rem', marginBottom: '8px' }}>
                    {label}
                </InputLabel>
            )}
            <DatePicker
                disabled={disabled}
                value={selectedDate ? moment(selectedDate) : null}
                onChange={handleChange}
                renderInput={params => <TextField {...params} variant="outlined" />}
                renderDay={renderWeekPickerDay}
                inputFormat="DD/MM/YYYY"
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
