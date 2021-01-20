/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import { withKnobs } from '@storybook/addon-knobs';
import SingleEditTable from '../components/editableTable/SingleEditTable';
import { linnTheme } from '../themes/linnTheme';
import mdx from './SingleEditTable.mdx';

export const component = () => (
    <div>
        <button type="button">Custom</button>
    </div>
);

const rows = [
    {
        id: 0,
        text: 'column 1',
        extraInfo: 'some extra information about column 1',
        number: 1,
        date: moment('2020-12-21'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component: 'custom 1'
    },
    {
        id: 1,
        text: 'column 2',
        extraInfo: 'some extra information about column 2',
        number: 2,
        date: moment('2020-12-25'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'two',
        component: 'custom 2'
    },
    {
        id: 2,
        text: 'column with no extra info',
        extraInfo: false,
        number: 3,
        date: moment('2020-12-20'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'three',
        component: 'custom 3'
    }
];

const columns = [
    {
        title: 'id',
        id: 'id',
        type: 'number',
        editable: false
    },
    {
        title: 'Text',
        id: 'text',
        type: 'text',
        editable: true,
        tooltip: row => row.extraInfo || false
    },
    {
        title: 'Number',
        id: 'number',
        type: 'number',
        editable: true
    },
    {
        title: 'Date',
        id: 'date',
        type: 'date',
        tooltip: () => 'From a function',
        editable: true
    },
    {
        title: 'Linn Week',
        id: 'linnWeek',
        type: 'linnWeek',
        editable: true
    },
    {
        title: 'Search',
        id: 'search',
        type: 'search',
        editable: true,
        searchResults: [
            { id: 'one', name: 'one' },
            { id: 'two', name: 'two' },
            { id: 'three', name: 'three' }
        ],
        search: () => {},
        selectSearchResult: () => {}
    },
    {
        title: 'Dropdown',
        id: 'dropdown',
        type: 'dropdown',
        editable: true,
        options: ['one', 'two', 'three']
    },
    {
        title: 'Component',
        id: 'component',
        type: 'component',
        editable: true,
        component: ({ value }) => (
            <div>
                <button type="button">{value}</button>
            </div>
        )
    }
];

export default {
    title: 'Components/EditableTable/SingleEditTable',
    decorators: [
        withKnobs,
        story => (
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    ],
    component: SingleEditTable,
    parameters: {
        docs: {
            page: mdx
        }
    }
};

export const Default = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        {...args}
    />
);

Default.story = {
    name: 'Default'
};

export const DisplayOnly = args => (
    <SingleEditTable
        {...args}
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        editable={false}
    />
);

DisplayOnly.story = {
    name: 'Display Only'
};

export const StaticRows = args => (
    <SingleEditTable
        {...args}
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        allowNewRowCreation={false}
    />
);

StaticRows.story = {
    name: 'New Row Disabled'
};

export const ShowDelete = args => (
    <SingleEditTable
        {...args}
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        deleteRowPreEdit
    />
);

ShowDelete.story = {
    name: 'Show Delete Prior to Edit'
};
