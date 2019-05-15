import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { BrowserRouter as Router } from 'react-router-dom';
import PaginatedTable from '../components/table/PaginatedTable';

const actions = {
    pageLoad: action('pageLoad'),
    pageSortedLoad: action('pageSortedLoad')
};

const page = {
    rows: [
        {
            Id: 'id1',
            values: ['1', '2', '3', '4'],
            expandableInfo: {
                Id: 'id1',
                elements: [
                    {
                        label: 'label',
                        value: 'value'
                    }
                ]
            }
        },
        {
            Id: 'id2',
            values: ['1', '2', '3', '4'],
            expandableInfo: {
                Id: 'id2',
                elements: [
                    {
                        label: 'label',
                        value: 'value'
                    }
                ]
            }
        }
    ],
    totalItemCount: 10
};
const columnNames = [
    { value: 'column 1', label: 'column 1-l' },
    { value: 'column 2', label: 'column 2-l' },
    { value: 'column 3', label: 'column 3-l' },
    { value: 'column 4', label: 'column 4-l' }
];

storiesOf('PaginatedTable', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <Router>
            <PaginatedTable
                page={page}
                sortable={false}
                columnNames={columnNames}
                pageLoad={actions.pageLoad}
                pageSortedLoad={actions.pageSortedLoad}
            />
        </Router>
    ))
    .add('with sorting enabled', () => (
        <Router>
            <PaginatedTable
                page={page}
                sortable
                columnNames={columnNames}
                pageLoad={actions.pageLoad}
                pageSortedLoad={actions.pageSortedLoad}
            />
        </Router>
    ));
