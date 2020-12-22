import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import MomentUtils from '@date-io/moment';
import DatePicker from '../components/DatePicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed')
};

export default {
    title: 'DatePicker',

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
    <DatePicker
        value={text('value', new Date('01/01/2001').toISOString())}
        minDate={text('minDate', new Date('01/01/2000').toISOString())}
        maxDate={text('maxDate', new Date('01/01/2020').toISOString())}
        disabled={boolean('disabled', false)}
        label={text('label', 'Your Label')}
        {...actions}
    />
);

Default.story = {
    name: 'default '
};
