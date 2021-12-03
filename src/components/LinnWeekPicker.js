import React from 'react';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import PickersDay from '@mui/lab/PickersDay';

import { getWeekStartDate, getWeekEndDate } from '../utilities/dateUtilities';

const useStyles = makeStyles((theme) => ({
    dayWrapper: {
        position: 'relative'
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: '0 2px',
        color: 'inherit'
    },
    customDayHighlight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '2px',
        right: '2px',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '50%'
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled
    },
    highlightNonCurrentMonthDay: {
        color: '#676767'
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    firstHighlight: {
        extend: 'highlight',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%'
    },
    endHighlight: {
        extend: 'highlight',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%'
    },
    label: {
        fontSize: theme.typography.fontSize
    }
}));

export default function LinnWeekPicker({
    selectedDate,
    setWeekStartDate,
    propertyName,
    label,
    disabled,
    required
}) {
    const classes = useStyles();

    const handleChange = (date) => {
        setWeekStartDate(propertyName, getWeekStartDate(date));
    };

    const CustomPickersDay = styled(PickersDay, {
        shouldForwardProp: (prop) =>
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

    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!selectedDate) {
            return <PickersDay {...pickersDayProps} />;
        }

        const start = getWeekStartDate(selectedDate);
        const end = getWeekEndDate(selectedDate);

        const dayIsBetween = date.isBetween(start, end, 'days', '[]');
        const isFirstDay = date.isSame(start, 'day');
        const isLastDay = date.isSame(end, 'day');

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    return (
        <>
            <InputLabel classes={{ root: classes.label }} required={required}>
                {label}
            </InputLabel>
            <DatePicker
                autoOk
                disabled={disabled}
                margin="dense"
                renderInput={(props) => <TextField {...props} />}
                inputVariant="outlined"
                value={selectedDate ? moment(selectedDate) : null}
                onChange={handleChange}
                renderDay={renderWeekPickerDay}
                format="DD/MM/YYYY"
            />
        </>
    );
}

LinnWeekPicker.propTypes = {
    selectedDate: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    setWeekStartDate: PropTypes.func.isRequired,
    propertyName: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool
};

LinnWeekPicker.defaultProps = {
    selectedDate: new Date(),
    propertyName: '',
    disabled: false,
    required: false,
    label: ''
};
