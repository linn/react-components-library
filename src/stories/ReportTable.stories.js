import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { boolean, text } from '@storybook/addon-knobs';
import ReportTable from '../components/ReportTable';

// data grabbed from an existing form to see how it renders.. there is definitely a better way to provide sample data!
const reportData = {
    title: { displayString: 'Product Ranges', drillDowns: [] },
    resultType: null,
    reportValueType: 'Value',
    displaySequence: null,
    headers: {
        rowHeader: 'Id',
        columnHeaders: ['Name', 'Description'],
        varianceRows: [],
        varianceColumns: [],
        totalColumns: [],
        textColumns: [0, 1]
    },
    filterOptions: [],
    results: [
        {
            rowTitle: { displayString: '2', drillDowns: [] },
            rowSortOrder: 0,
            values: [
                {
                    displayValue: null,
                    textDisplayValue: 'thing',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: [
                        {
                            name: 'sales-products',
                            href: '/products/reports/sales-products-by-product-range'
                        }
                    ]
                },
                {
                    displayValue: null,
                    textDisplayValue: 'AKURATE PRODUCTS',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: []
                }
            ],
            rowType: 'Value'
        },
        {
            rowTitle: { displayString: '10', drillDowns: [] },
            rowSortOrder: 1,
            values: [
                {
                    displayValue: null,
                    textDisplayValue: 'AML',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: [
                        {
                            name: 'sales-products',
                            href: '/products/reports/sales-products-'
                        }
                    ]
                },
                {
                    displayValue: null,
                    textDisplayValue: 'ASTON MARTIN',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: []
                }
            ],
            rowType: 'Value'
        },
        {
            rowTitle: { displayString: '6', drillDowns: [] },
            rowSortOrder: 2,
            values: [
                {
                    displayValue: null,
                    textDisplayValue: 'CLASSIK',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: [
                        {
                            name: 'sales-products',
                            href: '/products/reports/sales-products-by-produce'
                        }
                    ]
                },
                {
                    displayValue: null,
                    textDisplayValue: 'CLASSIK MUSIC',
                    prefix: null,
                    suffix: null,
                    decimalPlaces: null,
                    drillDowns: []
                }
            ],
            rowType: 'Value'
        }
    ],
    totals: {
        rowTitle: { displayString: 'Totals', drillDowns: [] },
        rowSortOrder: null,
        values: [
            {
                displayValue: null,
                textDisplayValue: null,
                prefix: null,
                suffix: null,
                decimalPlaces: null,
                drillDowns: []
            },
            {
                displayValue: null,
                textDisplayValue: null,
                prefix: null,
                suffix: null,
                decimalPlaces: null,
                drillDowns: []
            }
        ],
        rowType: 'Total'
    },
    reportHelpText: null
};

const stories = storiesOf('ReportTable', module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories.add('default', () => (
    <ReportTable
        showTitle={boolean('showTitle', false)}
        title={text('title', 'Your Report Title')}
        containsSubtotals={boolean('containsSubtotals', false)}
        showRowTitles={boolean('showRowTitles', false)}
        showTotals={boolean('showTotals', false)}
        reportData={object('reportData', reportData)}
    />
));
