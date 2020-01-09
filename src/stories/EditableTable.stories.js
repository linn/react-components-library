import React from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import Page from '../components/Page';
import EditableTable from '../components/editableTable/EditableTable';
import { linnTheme } from '../themes/linnTheme';

export const component = () => (
    <div>
        <button type="button">Custom</button>
    </div>
);

const options = ['one', 'two', 'three'];

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/Entities'
        }
    }
};

const columns = [
    {
        title: 'Text',
        id: 'text',
        type: 'text',
        editable: true
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

const rows = [
    {
        text: 'text',
        number: 123,
        date: moment(),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
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
    .add('default', () => <EditableTable columns={columns} rows={rows} />);
