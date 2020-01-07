import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from '@material-ui/core/styles/createMuiTheme';
import SnackbarMessage from '../components/SnackbarMessage';

storiesOf('SnackbarMessage', module)
    .addDecorator(story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <MuiThemeProvider theme={CreateMuiTheme()}>
            <SnackbarMessage
                message={text('message', 'Snackbar Message')}
                visible={boolean('visibile', true)}
                onClose={action('Close')}
            />
        </MuiThemeProvider>
    ));
