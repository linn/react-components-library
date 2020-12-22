import React, { useState } from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import { withKnobs } from '@storybook/addon-knobs';
import EditableTable from '../components/editableTable/EditableTable';
import { linnTheme } from '../themes/linnTheme';

// eslint-disable-next-line import/prefer-default-export
export const component = () => (
    <div>
        <button type="button">Custom</button>
    </div>
);

const options = ['one', 'two', 'three'];

const initialRows = [
    {
        id: 0,
        text: 'column 1',
        extraInfo: 'some extra information about column 1',
        number: 123,
        date: moment('2020-12-21'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component
    },
    {
        id: 1,
        text: 'column 2',
        extraInfo: 'some extra information about column 2',
        number: 123,
        date: moment('2020-12-25'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component
    },
    {
        id: 2,
        text: 'column with no extra info',
        extraInfo: false,
        number: 123,
        date: moment('2020-12-20'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component
    }
];

const columns = [
    {
        title: 'id',
        id: 'id',
        type: 'number',
        editable: true
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
        tooltip: row =>
            row.date?.month() === 11 && row.date?.date() === 25
                ? 'Christmas Day! :)'
                : 'Not Christmas Day :(',
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
        searchReults: options,
        search: () => {}
    },
    {
        title: 'Dropdown',
        id: 'dropdown',
        type: 'dropdown',
        editable: true,
        options
    },
    {
        title: 'Component',
        id: 'component',
        type: 'component',
        editable: true,
        component
    }
];

// Wrapper for the groupEdit story. Holds table data in state and defines stateful add, delete, and reset functions.
function Wrapper() {
    const [rows, setRows] = useState(initialRows);
    const addRow = () =>
        setRows([
            ...rows,
            {
                id: rows.length,
                text: '',
                extraInfo: false,
                number: 0,
                date: moment(),
                linnWeek: moment(),
                search: 'search',
                dropdown: 'one',
                component
            }
        ]);
    const removeRow = row => setRows(rows.filter(r => r.id !== row.id));
    const resetRow = row =>
        setRows(
            rows.map(r => {
                return r.id === row.id
                    ? {
                          id: r.id,
                          text: '',
                          extraInfo: false,
                          number: 0,
                          date: moment(),
                          linnWeek: moment(),
                          search: 'search',
                          dropdown: 'one',
                          component
                      }
                    : r;
            })
        );
    return (
        <EditableTable
            columns={columns}
            rows={rows}
            tableValid={() => true}
            closeRowOnClickAway
            resetRow={item => resetRow(item)}
            addRow={() => addRow()}
            removeRow={row => removeRow(row)}
            groupEdit
        />
    );
}

export default {
    title: 'Editable Table',

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

    excludeStories: ['component']
};

export const Default = () => (
    <EditableTable
        columns={columns}
        rows={initialRows}
        tableValid={() => true}
        closeRowOnClickAway
        deleteRow={() => true}
    />
);

Default.story = {
    name: 'default'
};

export const GroupEdit = () => <Wrapper />;

GroupEdit.story = {
    name: 'groupEdit'
};
