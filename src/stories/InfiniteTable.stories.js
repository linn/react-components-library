import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import { BrowserRouter as Router } from 'react-router-dom';
import InfiniteTable from '../components/table/InfiniteTable';

const table = {
    rows: [],
    totalItemCount: 100
};

for (let i = 0; i < 100; i += 1) {
    const newItem = {
        Id: `id${i}`,
        values: [`${i}`, `${i}`, `${i}`, `${i}`],
        expandableInfo: {
            Id: `id${i}`,
            elements: [
                {
                    label: 'label',
                    value: 'value'
                }
            ]
        }
    };
    table.rows.push(newItem);
}

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
