import moment from 'moment';

export function convertToMoment(date) {
    return moment.isMoment(date) ? date : moment(date);
}

export function cloneDate(date) {
    return moment.isMoment(date) ? date.clone() : moment(date, 'MM-DD-YYYY');
}

export function getWeekStartDate(date) {
    const dateClone = cloneDate(date);

    if (dateClone.day() === 6) {
        return dateClone.endOf('week');
    }

    return dateClone.startOf('week').subtract(1, 'days');
}

export function getWeekEndDate(date) {
    const dateClone = cloneDate(date);

    if (dateClone.day() === 6) {
        return dateClone.endOf('week').add(6, 'days');
    }

    return dateClone.endOf('week').subtract(1, 'days');
}
