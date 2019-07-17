import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CreateMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { BrowserRouter as Router } from 'react-router-dom';
import PaginatedTable from '../components/table/PaginatedTable';

const actions = {
    setPageOptions: action('setPageOptions'),
    handleRowLinkClick: action('handleRowLinkClick')
};

const totalItemCount = 5;

const columns = ['Type', 'Description'];

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
    .add('default ', () => (
        <MuiThemeProvider theme={CreateMuiTheme()}>
            <Router>
                <PaginatedTable
                    setPageOptions={actions.setPageOptions}
                    handleRowLinkClick={actions.handleRowLinkClick}
                    rows={rows}
                    columns={columns}
                    pageOptions={pageOptions}
                    totalItemCount={totalItemCount}
                />
            </Router>{' '}
        </MuiThemeProvider>
    ))
    .add('with sorting enabled', () => (
        <MuiThemeProvider theme={CreateMuiTheme()}>
            <Router>
                <PaginatedTable
                    setPageOptions={actions.setPageOptions}
                    handleRowLinkClick={actions.handleRowLinkClick}
                    rows={rows}
                    columns={columns}
                    pageOptions={pageOptions}
                    totalItemCount={totalItemCount}
                    sortable
                />
            </Router>
        </MuiThemeProvider>
    ))
    .add('with expandable enabled', () => (
        <MuiThemeProvider theme={CreateMuiTheme()}>
            <Router>
                <PaginatedTable
                    setPageOptions={actions.setPageOptions}
                    handleRowLinkClick={actions.handleRowLinkClick}
                    rows={rows}
                    columns={columns}
                    pageOptions={pageOptions}
                    totalItemCount={totalItemCount}
                    expandable
                />
            </Router>
        </MuiThemeProvider>
    ));
