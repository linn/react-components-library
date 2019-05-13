import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import { BrowserRouter as Router } from 'react-router-dom';
import InfiniteTable from '../components/table/InfiniteTable';

const table = {
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

const rowsWithoutExpandableInfo = {
    rows: [
        {
            Id: 'id1',
            values: ['1', '2', '3', '4']
        },
        {
            Id: 'id2',
            values: ['1', '2', '3', '4']
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

storiesOf('InfiniteTable', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <Router>
            <InfiniteTable table={table} columnNames={columnNames} />
        </Router>
    ))
    .add('with no expandable rows', () => (
        <Router>
            <InfiniteTable table={rowsWithoutExpandableInfo} columnNames={columnNames} />
        </Router>
    ));
