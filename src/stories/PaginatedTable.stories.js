import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
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
                elementType: 'KIKO DSM',
                sequence: 1,
                quantity: 2
            },
            {
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
                elementType: 'MAJIK DSM',
                sequence: 1,
                quantity: 2
            },
            {
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
                elementType: 'KLIMAX DSM',
                sequence: 1,
                quantity: 2
            },
            {
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
                elementType: 'AKURATE DSM',
                sequence: 1,
                quantity: 2
            },
            {
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
                elementType: 'SELEKT DSM',
                sequence: 1,
                quantity: 2
            },
            {
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

storiesOf('PaginatedTable', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .add('default ', () => (
        <PaginatedTable
            setPageOptions={actions.setPageOptions}
            handleRowLinkClick={actions.handleRowLinkClick}
            rows={rows}
            columns={columns}
            pageOptions={pageOptions}
            totalItemCount={totalItemCount}
        />
    ))
    .add('with sorting enabled', () => (
        <PaginatedTable
            setPageOptions={actions.setPageOptions}
            handleRowLinkClick={actions.handleRowLinkClick}
            rows={rows}
            columns={columns}
            pageOptions={pageOptions}
            totalItemCount={totalItemCount}
            sortable
        />
    ))
    .add('with expandable enabled', () => (
        <PaginatedTable
            setPageOptions={actions.setPageOptions}
            handleRowLinkClick={actions.handleRowLinkClick}
            rows={rows}
            columns={columns}
            pageOptions={pageOptions}
            totalItemCount={totalItemCount}
            expandable
        />
    ));
