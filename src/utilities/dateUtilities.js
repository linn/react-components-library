import moment from 'moment';

export function cloneDate(date) {
    return moment.isMoment(date) ? date.clone() : moment(date, 'MM-DD-YYYY');
}

// A Linn week runs Saturday to Friday, whatever moment's locale says. moment's startOf('week')
// follows the locale (Sunday in 'en', Monday in 'en-gb'), so count from day(), which is always
// 0 = Sunday ... 6 = Saturday.
const daysSinceSaturday = date => (date.day() + 1) % 7;

export function getWeekStartDate(date) {
    const dateClone = cloneDate(date);

    return dateClone.subtract(daysSinceSaturday(dateClone), 'days').startOf('day');
}

export function getWeekEndDate(date) {
    const dateClone = cloneDate(date);

    return dateClone.add(6 - daysSinceSaturday(dateClone), 'days').endOf('day');
}
