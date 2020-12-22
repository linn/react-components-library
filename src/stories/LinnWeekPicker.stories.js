import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { text, boolean } from '@storybook/addon-knobs';
import MomentUtils from '@date-io/moment';
import LinnWeekPicker from '../components/LinnWeekPicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'LinnWeekPicker',

    decorators: [
        story => <div>{story()}</div>,
        withKnobs,
        story => (
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    ]
};

export const Default = () => (
    <LinnWeekPicker
        value={new Date('01/01/2001')}
        disabled={boolean('disabled', false)}
        label={text('label', 'Your Label')}
        setWeekStartDate={() => {}}
        {...actions}
    />
);

Default.story = {
    name: 'default '
};
