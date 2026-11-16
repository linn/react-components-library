import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import moment from 'moment';
import { PickerDay } from '@mui/x-date-pickers/PickerDay';

import { getWeekStartDate, getWeekEndDate } from '../utilities/dateUtilities.js';

const CustomPickerDay = styled(PickerDay, {
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
    required = false,
    displayDate = 'start'
}) {
    // normalise first: the date utilities parse a non-moment as MM-DD-YYYY, which an ISO string isn't
    const selected = selectedDate ? moment(selectedDate) : null;
    const weekStart = selected ? moment(getWeekStartDate(selected)) : null;
    const weekEnd = selected ? moment(getWeekEndDate(selected)) : null;
    const shownDate = displayDate === 'end' ? weekEnd : weekStart;

    const handleChange = date => {
        setWeekStartDate(propertyName, getWeekStartDate(date));
    };

    const WeekPickerDay = pickersDayProps => {
        const { day: date } = pickersDayProps;
        if (!selected) {
            return <PickerDay {...pickersDayProps} />;
        }

        const dayIsBetween = moment(date).isBetween(weekStart, weekEnd, null, '[]');
        const isFirstDay = moment(date).isSame(weekStart, 'day');
        const isLastDay = moment(date).isSame(weekEnd, 'day');

        return (
            <CustomPickerDay
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
                // same label as InputField, so the two line up side by side
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
            )}
            <DatePicker
                disabled={disabled}
                value={shownDate}
                onChange={handleChange}
                format="DD-MMM-YYYY"
                slots={{ day: WeekPickerDay }}
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
            />
        </>
    );
}
