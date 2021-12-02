/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { action } from '@storybook/addon-actions';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import DateTimePicker from '../components/DateTimePicker';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'Components/DateTimePicker',
    decorators: [
        (story) => (
            <LocalizationProvider dateAdapter={AdapterDateMoment}>
                <ThemeProvider theme={createTheme()}>
                    <div>{story()}</div>
                </ThemeProvider>
            </LocalizationProvider>
        )
    ],
    component: DateTimePicker
};

export const Default = (args) => <DateTimePicker {...args} {...actions} />;

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
