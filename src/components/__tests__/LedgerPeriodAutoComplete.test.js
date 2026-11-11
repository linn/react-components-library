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

    test('renders steppers by default and hides them when opted out', () => {
        const { rerender } = render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={611}
                onChange={() => {}}
            />
        );

        expect(screen.getByTestId('ledger-step-next-month')).toBeInTheDocument();

        rerender(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={periods}
                value={611}
                onChange={() => {}}
                showSteppers={false}
            />
        );

        expect(screen.queryByTestId('ledger-step-next-month')).not.toBeInTheDocument();
    });

    // A fuller year's worth of periods so the ±12 (year) step has somewhere to land.
    const yearOfPeriods = Array.from({ length: 24 }, (_, i) => ({
        periodNumber: 600 + i,
        monthName: `P${600 + i}`
    }));

    test('steps forward one month to the next period', () => {
        const onChange = jest.fn();
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={yearOfPeriods}
                value={611}
                onChange={onChange}
                showSteppers
            />
        );

        fireEvent.click(screen.getByTestId('ledger-step-next-month'));

        expect(onChange).toHaveBeenCalledWith(612);
    });

    test('steps back one year by twelve periods', () => {
        const onChange = jest.fn();
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={yearOfPeriods}
                value={615}
                onChange={onChange}
                showSteppers
            />
        );

        fireEvent.click(screen.getByTestId('ledger-step-prev-year'));

        expect(onChange).toHaveBeenCalledWith(603);
    });

    test('disables the step that would go past the end of the range', () => {
        const onChange = jest.fn();
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={yearOfPeriods}
                value={623}
                onChange={onChange}
                showSteppers
            />
        );

        const nextMonth = screen.getByTestId('ledger-step-next-month');
        expect(nextMonth).toBeDisabled();
        fireEvent.click(nextMonth);
        expect(onChange).not.toHaveBeenCalled();
    });

    test('disables a year step when a full twelve periods are not available that way', () => {
        const onChange = jest.fn();
        // 24 periods (600-623); value 620 has only three periods ahead, so +1 year must be unavailable
        // rather than silently landing on 623.
        render(
            <LedgerPeriodAutoComplete
                label="Period"
                periods={yearOfPeriods}
                value={620}
                onChange={onChange}
                showSteppers
            />
        );

        const nextYear = screen.getByTestId('ledger-step-next-year');
        expect(nextYear).toBeDisabled();
        fireEvent.click(nextYear);
        expect(onChange).not.toHaveBeenCalled();
    });
});
