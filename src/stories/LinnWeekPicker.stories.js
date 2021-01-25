/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
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
