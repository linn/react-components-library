/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import PaginatedTable from '../components/table/PaginatedTable';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    setPageOptions: action('setPageOptions'),
    handleRowLinkClick: action('handleRowLinkClick')
};

const totalItemCount = 5;

const columns = { type: 'Type', description: 'Description' };

const pageOptions = {
    orderBy: '',
    orderAscending: false,
    currentPage: 0,
    rowsPerPage: 10
};

const rows = [
    {
        id: 1,
        salesPackageId: 'KIKO',
        description: 'KIKO PACKAGE',
        elements: [
            {
                id: 1,
                elementType: 'KIKO DSM',
                sequence: 1,
                quantity: 2
            },
            {
                id: 2,
                elementType: 'KIKO CABLE',
                sequence: 3,
                quantity: 2
            }
        ],
        links: [
            {
                href: '/products/maint/sales-packages/1',
                rel: 'self'
            }
        ],
        href: '/products/maint/sales-packages/1'
    },
    {
        id: 2,
        salesPackageId: 'MAJIK',
        description: 'MAJIK PACKAGE',
        elements: [
            {
                id: 1,
                elementType: 'MAJIK DSM',
                sequence: 1,
                quantity: 2
            },
            {
                id: 2,
                elementType: 'MAJIK CABLE',
                sequence: 3,
                quantity: 2
            }
        ],
        links: [
            {
                href: '/products/maint/sales-packages/1',
                rel: 'self'
            }
        ],
        href: '/products/maint/sales-packages/1'
    },
    {
        id: 3,
        salesPackageId: 'KLIMAX',
        description: 'KLIMAX PACKAGE',
        elements: [
            {
                id: 1,
                elementType: 'KLIMAX DSM',
                sequence: 1,
                quantity: 2
            },
            {
                id: 2,
                elementType: 'KLIMAX CABLE',
                sequence: 3,
                quantity: 2
            }
        ],
        links: [
            {
                href: '/products/maint/sales-packages/1',
                rel: 'self'
            }
        ],
        href: '/products/maint/sales-packages/1'
    },
    {
        id: 4,
        salesPackageId: 'AKURATE',
        description: 'AKURATE PACKAGE',
        elements: [
            {
                id: 1,
                elementType: 'AKURATE DSM',
                sequence: 1,
                quantity: 2
            },
            {
                id: 2,
                elementType: 'AKURATE CABLE',
                sequence: 3,
                quantity: 2
            }
        ],
        links: [
            {
                href: '/products/maint/sales-packages/1',
                rel: 'self'
            }
        ],
        href: '/products/maint/sales-packages/1'
    },
    {
        id: 5,
        salesPackageId: 'SELEKT',
        description: 'SELEKT PACKAGE',
        elements: [
            {
                id: 1,
                elementType: 'SELEKT DSM',
                sequence: 1,
                quantity: 2
            },
            {
                id: 2,
                elementType: 'SELEKT CABLE',
                sequence: 3,
                quantity: 2
            }
        ],
        links: [
            {
                href: '/products/maint/sales-packages/1',
                rel: 'self'
            }
        ],
        href: '/products/maint/sales-packages/1'
    }
];

export default {
    title: 'Components/PaginatedTable',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: PaginatedTable
};

export const Default = args => <PaginatedTable {...actions} {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    rows,
    columns,
    pageOptions,
    totalItemCount
};

export const WithSortingEnabled = args => <PaginatedTable {...actions} {...args} />;

WithSortingEnabled.story = {
    name: 'with sorting enabled'
};

WithSortingEnabled.args = {
    rows,
    columns,
    pageOptions,
    totalItemCount,
    sortable: true
};

export const WithExpandableEnabled = args => <PaginatedTable {...actions} {...args} />;

WithExpandableEnabled.story = {
    name: 'with expandable enabled'
};

WithExpandableEnabled.args = {
    rows,
    columns,
    pageOptions,
    totalItemCount,
    expandable: true
};

export const WithNoRows = args => <PaginatedTable {...actions} {...args} />;

WithNoRows.story = {
    name: 'with no rows'
};

WithNoRows.args = {
    rows: null,
    columns,
    pageOptions,
    totalItemCount,
    expandable: true
};
