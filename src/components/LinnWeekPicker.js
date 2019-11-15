import React, { Fragment } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { getWeekStartDate, getWeekEndDate } from '../utilities/dateUtilities';

const useStyles = makeStyles(theme => ({
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
    weekStartDate,
    setWeekStartDate,
    propertyName,
    label,
    disabled,
    required
}) {
    const classes = useStyles();

    const handleChange = date => {
        setWeekStartDate(propertyName, getWeekStartDate(date));
    };

    const renderWeekDay = (date, selected, dayInCurrentMonth) => {
        const start = getWeekStartDate(selected);
        const end = getWeekEndDate(selected);

        const dayIsBetween = date.isBetween(start, end, 'days', '[]');
        const isFirstDay = date.isSame(start, 'day');
        const isLastDay = date.isSame(end, 'day');

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span> {date.format('D')} </span>
                </IconButton>
            </div>
        );
    };

    return (
        <Fragment>
            <InputLabel classes={{ root: classes.label }} required={required}>
                {label}
            </InputLabel>
            <DatePicker
                autoOk
                disabled={disabled}
                margin="dense"
                inputVariant="outlined"
                value={moment.isMoment(weekStartDate) ? weekStartDate : moment(weekStartDate)}
                onChange={handleChange}
                renderDay={renderWeekDay}
                format="DD/MM/YYYY"
            />
        </Fragment>
    );
}

LinnWeekPicker.propTypes = {
    weekStartDate: PropTypes.oneOfType(PropTypes.shape({}), PropTypes.string),
    setWeekStartDate: PropTypes.func.isRequired,
    propertyName: PropTypes.string,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool
};

LinnWeekPicker.defaultProps = {
    weekStartDate: null,
    propertyName: '',
    disabled: false,
    required: false
};
