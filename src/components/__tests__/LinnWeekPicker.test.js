import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import moment from 'moment';
import render from '../../test-utils';
import LinnWeekPicker from '../LinnWeekPicker';

afterEach(cleanup);

describe('<LinnWeekPicker />', () => {
    test('should display date when date passed as date', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                weekStartDate={moment('11-09-2019', 'MM-DD-YYYY')}
            />
        );
        const item = getByDisplayValue('09/11/2019');
        expect(item).toBeInTheDocument();
    });

    test('should display date when date passed as string', () => {
        const { getByDisplayValue } = render(
            <LinnWeekPicker
                setWeekStartDate={() => {}}
                label="Test"
                weekStartDate={moment('11-09-2019', 'MM-DD-YYYY').toISOString()}
            />
        );

        const item = getByDisplayValue('09/11/2019');
        expect(item).toBeInTheDocument();
    });
});
