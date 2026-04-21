import { MemoryRouter } from 'react-router-dom';
import ReportDataGrid from './ReportDataGrid';

const makeReport = (title, rows, totals = null) => ({
    title: { displayString: title },
    headers: {
        columnHeaders: ['Product', 'Qty', 'Unit Price', 'Total'],
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
                columnId: 'unitPrice',
                align: 'right',
                columnWidth: 130,
                columnType: 'number',
                decimalPlaces: 2
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
        rowType: r.rowType || 'Normal',
        values: [
            { displayValue: r.product },
            { displayValue: r.qty },
            { displayValue: r.unitPrice },
            { displayValue: r.total }
        ]
    })),
    totals: totals
        ? {
              values: [
                  { displayValue: '' },
                  { displayValue: totals.qty },
                  { displayValue: '' },
                  { displayValue: totals.total }
              ]
          }
        : null
});

const basicRows = [
    { product: 'Widget A', qty: 10, unitPrice: 4.99, total: 49.9 },
    { product: 'Widget B', qty: 5, unitPrice: 12.0, total: 60.0 },
    { product: 'Gadget Pro', qty: 2, unitPrice: 99.99, total: 199.98 }
];

const rowsWithSubtotal = [
    ...basicRows,
    { product: 'Subtotal', qty: 17, unitPrice: 0, total: 309.88, rowType: 'Subtotal' }
];

const reportWithDrillDowns = {
    title: { displayString: 'Report with drill-downs' },
    headers: {
        columnHeaders: ['Product', 'Qty'],
        dataGridColumnSpecifications: [
            { columnId: 'product', align: 'left', columnWidth: 250, columnType: 'text' },
            {
                columnId: 'qty',
                align: 'right',
                columnWidth: 100,
                columnType: 'number',
                decimalPlaces: 0
            }
        ]
    },
    results: [
        {
            rowTitle: { displayString: 'row0' },
            rowType: 'Normal',
            values: [
                {
                    displayValue: 'Widget A',
                    drillDowns: [{ href: '/products/widget-a', externalLink: false }]
                },
                { displayValue: 10 }
            ]
        },
        {
            rowTitle: { displayString: 'row1' },
            rowType: 'Normal',
            values: [
                {
                    displayValue: 'Widget B',
                    drillDowns: [
                        { href: 'https://example.com/products/widget-b', externalLink: true }
                    ]
                },
                { displayValue: 5 }
            ]
        }
    ],
    totals: null
};

const reportWithColours = {
    title: { displayString: 'Report with colour attributes' },
    headers: {
        columnHeaders: ['Status', 'Count'],
        dataGridColumnSpecifications: [
            { columnId: 'status', align: 'left', columnWidth: 200, columnType: 'text' },
            {
                columnId: 'count',
                align: 'right',
                columnWidth: 120,
                columnType: 'number',
                decimalPlaces: 0
            }
        ]
    },
    results: [
        {
            rowTitle: { displayString: 'row0' },
            rowType: 'Normal',
            values: [
                {
                    displayValue: 'In Stock',
                    attributes: [{ attributeType: 'background-colour', attributeValue: '#c8e6c9' }]
                },
                { displayValue: 150 }
            ]
        },
        {
            rowTitle: { displayString: 'row1' },
            rowType: 'Normal',
            values: [
                {
                    displayValue: 'Low Stock',
                    attributes: [{ attributeType: 'background-colour', attributeValue: '#fff9c4' }]
                },
                { displayValue: 12 }
            ]
        },
        {
            rowTitle: { displayString: 'row2' },
            rowType: 'Normal',
            values: [
                {
                    displayValue: 'Out of Stock',
                    attributes: [
                        { attributeType: 'background-colour', attributeValue: '#ffcdd2' },
                        { attributeType: 'text-colour', attributeValue: '#b71c1c' }
                    ]
                },
                { displayValue: 3 }
            ]
        }
    ],
    totals: null
};

export default {
    title: 'Components/ReportDataGrid',
    component: ReportDataGrid,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        report: makeReport('Products Report', basicRows),
        renderZeroes: false,
        showHeader: true,
        showExport: false,
        showTotals: false,
        openLinksInNewTabs: true,
        fixedRowHeight: false,
        showRowCount: false
    }
};

export const Default = {};

export const WithTotals = {
    name: 'With totals row',
    args: {
        report: makeReport('Products Report (with totals)', basicRows, { qty: 17, total: 309.88 }),
        showTotals: true
    }
};

export const WithSubtotalRows = {
    name: 'With subtotal row types',
    args: {
        report: makeReport('Products Summary', rowsWithSubtotal)
    }
};

export const WithRowCount = {
    name: 'With row count',
    args: {
        showRowCount: true
    }
};

export const WithDrillDowns = {
    name: 'With drill-down links',
    args: {
        report: reportWithDrillDowns
    }
};

export const WithColourAttributes = {
    name: 'With colour attributes',
    args: {
        report: reportWithColours
    }
};

export const NoHeader = {
    name: 'No column header',
    args: {
        showHeader: false
    }
};

export const FixedRowHeight = {
    name: 'Fixed row height',
    args: {
        fixedRowHeight: true
    }
};

export const RenderZeroes = {
    name: 'Render zeroes',
    args: {
        renderZeroes: true
    }
};
