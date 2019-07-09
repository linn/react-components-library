import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('SaveBackCancelButtons', module)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div style={{ position: 'absolute', right: '50%', top: '50%' }}>{story()}</div>
        </ThemeProvider>
    ))
    .addDecorator(withKnobs)
    .add('default', () => <SaveBackCancelButtons {...actions} />)
    .add('saveDisabled', () => <SaveBackCancelButtons {...actions} saveDisabled />);
