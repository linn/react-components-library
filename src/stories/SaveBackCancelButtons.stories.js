/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import SaveBackCancelButtons from '../components/SaveBackCancelButtons';

const actions = {
    saveClick: action('Saved'),
    cancelClick: action('Cancelled'),
    backClick: action('Back')
};

export default {
    title: 'Components/SaveBackCancelButtons',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                    <div style={{ position: 'absolute', right: '50%', top: '50%' }}>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: SaveBackCancelButtons
};

export const Default = args => <SaveBackCancelButtons {...actions} {...args} />;

Default.story = {
    name: 'default'
};

export const SaveDisabled = args => <SaveBackCancelButtons {...actions} {...args} />;

SaveDisabled.story = {
    name: 'saveDisabled'
};

SaveDisabled.args = {
    saveDisabled: true
};
