import moment from 'moment';
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
