import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import ReportDataGrids from './ReportDataGrids';

const makeReport = (title, rows) => ({
    title: { displayString: title },
    headers: {
        columnHeaders: ['Product', 'Qty', 'Total'],
        dataGridColumnSpecifications: [
            { columnId: 'product', align: 'left', columnWidth: 200, columnType: 'text' },
            {
                columnId: 'qty',
                align: 'right',
                columnWidth: 100,
                columnType: 'number',
                decimalPlaces: 0
            },
            {
                columnId: 'total',
                align: 'right',
                columnWidth: 130,
                columnType: 'number',
                decimalPlaces: 2
            }
        ]
    },
    results: rows.map((r, i) => ({
        rowTitle: { displayString: `row${i}` },
        rowType: 'Normal',
        values: [
            { displayValue: r.product },
            { displayValue: r.qty },
            { displayValue: r.total }
        ]
    })),
    totals: null
});

const reportData = [
    makeReport('Widgets Report', [
        { product: 'Widget A', qty: 10, total: 49.9 },
        { product: 'Widget B', qty: 5, total: 60.0 }
    ]),
    makeReport('Gadgets Report', [
        { product: 'Gadget Pro', qty: 2, total: 199.98 },
        { product: 'Gadget Lite', qty: 8, total: 79.92 }
    ])
];

export default {
    title: 'Components/ReportDataGrids',
    component: ReportDataGrids,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        reportData,
        renderZeroes: false,
        titlesVariant: 'h6',
        repeatHeaders: true,
        perReportExport: false,
        openLinksInNewTabs: true,
        showTotals: false,
        fixedRowHeight: false,
        showRowCount: false
    }
};

export const Default = {};

export const SingleReport = {
    name: 'Single report',
    args: {
        reportData: [reportData[0]]
    }
};

export const WithRowCount = {
    name: 'With row count',
    args: {
        showRowCount: true
    }
};

export const NoRepeatHeaders = {
    name: 'No repeat headers',
    args: {
        repeatHeaders: false
    }
};

export const WithExportPerReport = {
    name: 'Per-report export',
    args: {
        perReportExport: true
    }
};
