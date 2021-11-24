/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import MomentUtils from '@date-io/moment';
import LinnWeekPicker from '../components/LinnWeekPicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed'),
    setWeekStartDate: action('set week start date')
};

export default {
    title: 'Components/LinnWeekPicker',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                        <div>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: LinnWeekPicker
};

export const Default = args => <LinnWeekPicker {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: new Date('01/01/2001'),
    disabled: false,
    label: 'Your Label'
};
