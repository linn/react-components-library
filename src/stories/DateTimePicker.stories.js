/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateTimePicker from '../components/DateTimePicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'Components/DateTimePicker',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    ],
    component: DateTimePicker
};

export const Default = args => <DateTimePicker {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: new Date('01/01/2001').toISOString(),
    minDate: new Date('01/01/2000').toISOString(),
    maxDate: new Date('01/01/2030').toISOString(),
    disabled: false,
    label: 'Your Label'
};
