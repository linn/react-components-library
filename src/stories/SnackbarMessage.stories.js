/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import SnackbarMessage from '../components/SnackbarMessage';

export default {
    title: 'Components/SnackbarMessage',
    decorators: [
        story => (
            <MuiThemeProvider theme={createTheme()}>
                <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
            </MuiThemeProvider>
        )
    ],
    component: SnackbarMessage
};

export const Default = args => <SnackbarMessage {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    message: 'Snackbar Message',
    visible: true,
    onClose: action('Close')
};
