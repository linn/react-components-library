import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import moment from 'moment';
import render from '../../test-utils';
import DatePicker from '../DatePicker';

afterEach(cleanup);

describe('<DatePicker />', () => {
    test('should display the date', () => {
        const { getByDisplayValue } = render(
            <DatePicker label="Date" value={moment('11-09-2019', 'DD-MM-YYYY')} />
        );
        expect(getByDisplayValue('11/09/2019')).toBeInTheDocument();
    });

    test('should display the date in the format given', () => {
        const { getByDisplayValue } = render(
            <DatePicker
                label="Date"
                value={moment('11-09-2019', 'DD-MM-YYYY')}
                datePickerProps={{ format: 'DD-MMM-YYYY' }}
            />
        );
        expect(getByDisplayValue('11-Sep-2019')).toBeInTheDocument();
    });

    test('should label the field by its propertyName', () => {
        const { getByLabelText } = render(
            <DatePicker
                label="Date Raised"
                propertyName="dateRaised"
                value={moment('11-09-2019', 'DD-MM-YYYY')}
            />
        );
        expect(getByLabelText('Date Raised')).toHaveValue('11/09/2019');
    });

    test('should mark the label of a required date', () => {
        const { getByText } = render(
            <DatePicker label="Date Raised" required value={moment('11-09-2019', 'DD-MM-YYYY')} />
        );
        expect(getByText('*')).toBeInTheDocument();
    });
});
