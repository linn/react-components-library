import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
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
            <ThemeProvider theme={linnTheme}>
                <div style={{ position: 'absolute', right: '50%', top: '50%' }}>{story()}</div>
            </ThemeProvider>
        ),
        withKnobs
    ]
};

export const Default = () => <SaveBackCancelButtons {...actions} />;

Default.story = {
    name: 'default'
};

export const SaveDisabled = () => <SaveBackCancelButtons {...actions} saveDisabled />;

SaveDisabled.story = {
    name: 'saveDisabled'
};
