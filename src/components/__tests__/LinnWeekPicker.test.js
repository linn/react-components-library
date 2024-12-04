import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import moment from 'moment';
import render from '../../test-utils';
import LinnWeekPicker from '../LinnWeekPicker';

afterEach(cleanup);

describe('<LinnWeekPicker />', () => {
    test('should display date when date passed as moment object', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY')}
            />
        );
        const item = getByDisplayValue('11.09.2019');
        expect(item).toBeInTheDocument();
    });

    test('should display date when date passed as date object', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={new Date('01/01/2020')}
            />
        );
        const item = getByDisplayValue('01.01.2020');
        expect(item).toBeInTheDocument();
    });

    test('should display date when date passed as string', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                selectedDate={moment('11-09-2019', 'DD-MM-YYYY').toISOString()}
            />
        );

        const item = getByDisplayValue('11.09.2019');
        expect(item).toBeInTheDocument();
    });
});
