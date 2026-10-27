import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import render from '../../test-utils';
import LedgerPeriodAutoComplete from '../LedgerPeriodAutoComplete';

afterEach(cleanup);

describe('LedgerPeriodAutoComplete', () => {
    const periods = [
        { periodNumber: 612, monthName: 'APR2026' },
        { periodNumber: 611, monthName: 'MAR2026' },
        { periodNumber: 610, monthName: 'FEB2026' }
    ];

    test('shows the month name for the numeric value', () => {
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={611}
                onChange={() => {}}
            />
        );

        expect(screen.getByRole('combobox')).toHaveValue('MAR2026');
    });

    test('reports the chosen period number (not the object) on change', () => {
        const onChange = jest.fn();
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={611}
                onChange={onChange}
            />
        );

        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: '610' } });
        fireEvent.blur(input);

        expect(onChange).toHaveBeenCalledWith(610);
    });

    test('applies the optional filter to the options', () => {
        const onChange = jest.fn();
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={null}
                onChange={onChange}
                filter={period => period.periodNumber >= 611}
            />
        );

        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: '610' } });
        fireEvent.blur(input);

        expect(onChange).not.toHaveBeenCalled();
    });

    test('offers the periods in period order', () => {
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={null}
                onChange={() => {}}
            />
        );

        fireEvent.mouseDown(screen.getByRole('combobox'));

        expect(screen.getAllByRole('option').map(o => o.textContent)).toEqual([
            'FEB2026',
            'MAR2026',
            'APR2026'
        ]);
    });
});
