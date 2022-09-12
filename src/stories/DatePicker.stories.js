import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { action } from '@storybook/addon-actions';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from '../components/DatePicker';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'Components/DatePicker',
    decorators: [
        story => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <ThemeProvider theme={createTheme()}>
                    <div>{story()}</div>
                </ThemeProvider>
            </LocalizationProvider>
        )
    ],
    component: DatePicker
};

export const Default = args => <DatePicker {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: new Date().toISOString(),
    minDate: new Date('01/01/2000').toISOString(),
    maxDate: new Date('01/01/2030').toISOString(),
    disabled: false,
    label: 'Your Label'
};
