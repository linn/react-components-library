import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { getWeekStartDate, getWeekEndDate } from '../dateUtilities';

describe('when getting linn week start date', () => {
    describe('when passing moment date and not a saturday', () => {
        it('should return correct date', () => {
            const date = moment('11-13-2019', 'MM-DD-YYYY');
            const result = getWeekStartDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-09-2019');
        });
    });

    describe('when passing moment date on a saturday', () => {
        it('should return date as week start', () => {
            const date = moment('11-09-2019', 'MM-DD-YYYY');
            const result = getWeekStartDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-09-2019');
        });
    });

    describe('when passing date string and not a saturday', () => {
        it('should return correct date', () => {
            const date = '11-13-2019';
            const result = getWeekStartDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-09-2019');
        });
    });

    describe('when passing date string on a saturday', () => {
        it('should return date as week start', () => {
            const date = '11-09-2019';
            const result = getWeekStartDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-09-2019');
        });
    });
});

describe('when getting linn week end date', () => {
    describe('when passing moment date and not a saturday', () => {
        it('should return correct date', () => {
            const date = moment('11-13-2019', 'MM-DD-YYYY');
            const result = getWeekEndDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-15-2019');
        });
    });

    describe('when passing moment date on a saturday', () => {
        it('should return correct date', () => {
            const date = moment('11-09-2019', 'MM-DD-YYYY');
            const result = getWeekEndDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-15-2019');
        });
    });

    describe('when passing date string and not a saturday', () => {
        it('should return correct date', () => {
            const date = '11-13-2019';
            const result = getWeekEndDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-15-2019');
        });
    });

    describe('when passing date string on a saturday', () => {
        it('should return correct date', () => {
            const date = '11-09-2019';
            const result = getWeekEndDate(date);
            expect(result.format('MM-DD-YYYY')).toEqual('11-15-2019');
        });
    });
});

// A Linn week is Saturday to Friday in every locale, including ones whose weeks start on Sunday ('en') or Monday ('en-gb', 'fr').
describe.each(['en', 'en-gb', 'fr'])('when moment locale is %s', locale => {
    beforeEach(() => {
        moment.locale(locale);
        // guard: an unknown locale would silently leave the old one in place
        expect(moment.locale()).toEqual(locale);
    });
    afterAll(() => moment.locale('en'));

    // Sat 09-Nov-2019 to Fri 15-Nov-2019
    test.each(['11-09-2019', '11-10-2019', '11-11-2019', '11-13-2019', '11-15-2019'])(
        '%s is in the week Saturday 11-09-2019 to Friday 11-15-2019',
        day => {
            const date = moment(day, 'MM-DD-YYYY');
            expect(getWeekStartDate(date).format('ddd MM-DD-YYYY HH:mm')).toEqual(
                moment('11-09-2019', 'MM-DD-YYYY').format('ddd MM-DD-YYYY [00:00]')
            );
            expect(getWeekEndDate(date).format('ddd MM-DD-YYYY HH:mm')).toEqual(
                moment('11-15-2019', 'MM-DD-YYYY').format('ddd MM-DD-YYYY [23:59]')
            );
        }
    );

    test('a Friday ends its own week and the next day starts a new one', () => {
        expect(getWeekEndDate(moment('11-15-2019', 'MM-DD-YYYY')).format('MM-DD-YYYY')).toEqual(
            '11-15-2019'
        );
        expect(getWeekStartDate(moment('11-16-2019', 'MM-DD-YYYY')).format('MM-DD-YYYY')).toEqual(
            '11-16-2019'
        );
    });

    test('does not change the date passed in', () => {
        const date = moment('11-13-2019', 'MM-DD-YYYY');
        getWeekStartDate(date);
        getWeekEndDate(date);
        expect(date.format('MM-DD-YYYY')).toEqual('11-13-2019');
    });
});
