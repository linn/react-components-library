import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CreateMuiTheme from '@material-ui/core/styles/createMuiTheme';
import SnackbarMessage from '../components/SnackbarMessage';

export default {
    title: 'Components/SnackbarMessage',

    decorators: [
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        withKnobs
    ]
};

export const Default = () => (
    <MuiThemeProvider theme={CreateMuiTheme()}>
        <SnackbarMessage
            message={text('message', 'Snackbar Message')}
            visible={boolean('visibile', true)}
            onClose={action('Close')}
        />
    </MuiThemeProvider>
);

Default.story = {
    name: 'default '
};
