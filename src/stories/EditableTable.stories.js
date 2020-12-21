import React from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import { storiesOf } from '@storybook/react';
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

const rows = [
    {
        text: 'column 1',
        extraInfo: 'some extra information about column 1',
        number: 123,
        date: moment(),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component
    },
    {
        text: 'column 2',
        extraInfo: 'some extra information about column 2',
        number: 123,
        date: moment(),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component
    }
];

const columns = [
    {
        title: 'Text',
        id: 'text',
        type: 'text',
        editable: true,
        tooltip: row => row.extraInfo
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

storiesOf('Editable Table', module)
    .addDecorator(withKnobs)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div>{story()}</div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    ))
    .add('default', () => <EditableTable columns={columns} rows={rows} tableValid={() => true} />);
