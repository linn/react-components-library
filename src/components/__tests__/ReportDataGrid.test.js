import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportDataGrid from '../ReportDataGrid';

const makeReport = totalColumns => ({
    title: { displayString: 'Report' },
    headers: {
        columnHeaders: ['Product', 'Amount'],
        dataGridColumnSpecifications: [
            { columnId: 'product', columnWidth: 200, columnType: 'text' },
            { columnId: 'amount', columnWidth: 130, columnType: 'number', decimalPlaces: 2 }
        ],
        totalColumns
    },
    results: [
        {
            rowTitle: { displayString: 'row0' },
            rowType: 'Normal',
            values: [
                { displayValue: 'Widget' },
                {
                    displayValue: 12.5,
                    attributes: [
                        { attributeType: 'text-colour', attributeValue: '#b71c1c' },
                        { attributeType: 'background-colour', attributeValue: '#ffcdd2' }
                    ]
                }
            ]
        }
    ],
    totals: { values: [{ displayValue: '' }, { displayValue: 12.5 }] }
});

describe('ReportDataGrid total columns', () => {
    test('bolds columns identified by index and preserves cell colours', () => {
        render(<ReportDataGrid report={makeReport([1])} />);

        const totalCell = screen.getByText('12.50').closest('[role="gridcell"]');
        expect(totalCell).toHaveClass('totalColumn', 'cell-tc-b71c1c', 'cell-bg-ffcdd2');
        expect(totalCell).toHaveStyle('font-weight: 700');
        expect(screen.getByText('Widget').closest('[role="gridcell"]')).not.toHaveClass(
            'totalColumn'
        );
    });

    test.each([undefined, []])('does not bold ordinary columns with metadata %p', totalColumns => {
        render(<ReportDataGrid report={makeReport(totalColumns)} />);

        expect(screen.getByText('12.50').closest('[role="gridcell"]')).not.toHaveClass(
            'totalColumn'
        );
    });

    test('preserves bold total rows alongside total columns', () => {
        render(<ReportDataGrid report={makeReport([1])} showTotals />);

        const totalCells = screen.getAllByText('12.50');
        expect(totalCells).toHaveLength(2);
        expect(totalCells[1].closest('[role="row"]')).toHaveClass('totalLine');
        expect(totalCells[1].closest('[role="gridcell"]')).toHaveClass('totalColumn');
    });
});

// A report with a single date column whose display order (alphabetical) differs from
// its chronological order, so sorting correctness is observable.
const makeDateReport = () => ({
    title: { displayString: 'Report' },
    headers: {
        columnHeaders: ['Date'],
        dataGridColumnSpecifications: [{ columnId: 'date', columnWidth: 200, columnType: 'date' }]
    },
    results: [
        {
            rowTitle: { displayString: 'a' },
            rowType: 'Normal',
            values: [{ textDisplayValue: '02-Nov-2026', sortValue: '2026-11-02T00:00:00.0000000' }]
        },
        {
            rowTitle: { displayString: 'b' },
            rowType: 'Normal',
            values: [{ textDisplayValue: '10-Jan-2026', sortValue: '2026-01-10T00:00:00.0000000' }]
        },
        {
            rowTitle: { displayString: 'c' },
            rowType: 'Normal',
            values: [{ textDisplayValue: '25-Mar-2025', sortValue: '2025-03-25T00:00:00.0000000' }]
        }
    ],
    totals: { values: [{ displayValue: '' }] }
});

const dateColumnOrder = () =>
    Array.from(document.querySelectorAll('[role="gridcell"][data-field="date"]')).map(
        c => c.textContent
    );

describe('ReportDataGrid date columns', () => {
    test('renders the backend formatted display string', () => {
        render(<ReportDataGrid report={makeDateReport()} />);

        expect(screen.getByText('02-Nov-2026')).toBeInTheDocument();
        expect(screen.getByText('25-Mar-2025')).toBeInTheDocument();
    });

    test('sorts chronologically, not alphabetically, when sorting ascending', async () => {
        render(<ReportDataGrid report={makeDateReport()} showExport />);

        await userEvent.click(screen.getByRole('columnheader', { name: /Date/ }));

        // Chronological ascending: Mar-2025, Jan-2026, Nov-2026.
        // Alphabetical ascending would have been: 02-Nov-2026, 10-Jan-2026, 25-Mar-2025.
        expect(dateColumnOrder()).toEqual(['25-Mar-2025', '10-Jan-2026', '02-Nov-2026']);
    });

    test('sorts chronologically descending on second header click', async () => {
        render(<ReportDataGrid report={makeDateReport()} showExport />);

        const header = screen.getByRole('columnheader', { name: /Date/ });
        await userEvent.click(header);
        await userEvent.click(header);

        expect(dateColumnOrder()).toEqual(['02-Nov-2026', '10-Jan-2026', '25-Mar-2025']);
    });
});
