import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { text } from '@storybook/addon-knobs';
import MomentUtils from '@date-io/moment';
import DatePicker from '../components/DatePicker';
import { linnTheme } from '../themes/linnTheme';

const actions = {
    onChange: action('date changed')
};

storiesOf('DatePicker', module)
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
        <DatePicker
            value={text('value', new Date('01/01/2001').toISOString())}
            minDate={text('minDate', new Date('01/01/2000').toISOString())}
            mmaxate={text('maxDate', new Date('01/01/2020').toISOString())}
            label={text('label', 'Your Label')}
            {...actions}
        />
    ));
