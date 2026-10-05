import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
