/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import MomentUtils from '@date-io/moment';
import DatePicker from '../components/DatePicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'Components/DatePicker',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                        <div>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: DatePicker
};

export const Default = args => <DatePicker {...args} {...actions} />;

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
