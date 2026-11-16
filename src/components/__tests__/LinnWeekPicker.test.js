import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import moment from 'moment';
import render from '../../test-utils';
import LinnWeekPicker from '../LinnWeekPicker';

afterEach(cleanup);

// weeks run Saturday to Friday: Wed 11-Sep-2019 is in the week 07-Sep-2019 to 13-Sep-2019
describe('<LinnWeekPicker />', () => {
    test('should display the start of the week by default when date passed as moment object', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY')}
            />
        );
        expect(getByDisplayValue('07-Sep-2019')).toBeInTheDocument();
    });

    test('should display the start of the week by default when date passed as date object', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={new Date(2020, 0, 1)}
            />
        );
        expect(getByDisplayValue('28-Dec-2019')).toBeInTheDocument();
    });

    test('should display the start of the week by default when date passed as string', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY').toISOString()}
            />
        );
        expect(getByDisplayValue('07-Sep-2019')).toBeInTheDocument();
    });

    test('should display the end of the week when displayDate is end', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                displayDate="end"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY')}
            />
        );
        expect(getByDisplayValue('13-Sep-2019')).toBeInTheDocument();
    });

    test('should display the end of the week when displayDate is end and date passed as string', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                displayDate="end"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY').toISOString()}
            />
        );
        expect(getByDisplayValue('13-Sep-2019')).toBeInTheDocument();
    });

    test('should label the field by its propertyName', () => {
        const { getByLabelText } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Production Week"
                propertyName="weekStart"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY')}
            />
        );
        expect(getByLabelText('Production Week')).toHaveValue('07-Sep-2019');
    });
});
