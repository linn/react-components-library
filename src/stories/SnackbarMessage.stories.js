/* eslint-disable react/jsx-props-no-spreading */

import { action } from '@storybook/addon-actions';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import SnackbarMessage from '../components/SnackbarMessage';

export default {
    title: 'Components/SnackbarMessage',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={createTheme()}>
                    <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
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
