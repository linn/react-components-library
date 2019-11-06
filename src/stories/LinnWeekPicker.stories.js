import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
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

storiesOf('LinnWeekPicker', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div>{story()}</div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    ))
    .add('default ', () => (
        <LinnWeekPicker
            value={new Date('01/01/2001')}
            disabled={boolean('disabled', false)}
            label={text('label', 'Your Label')}
            {...actions}
        />
    ));
