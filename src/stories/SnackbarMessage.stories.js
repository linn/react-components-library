import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, boolean } from '@storybook/addon-knobs';

import SnackbarMessage from '../components/SnackbarMessage';

storiesOf('SnackbarMessage', module)
    .addDecorator(story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <SnackbarMessage
            message={text('message', 'Snackbar Message')}
            visible={boolean('visibile', true)}
            onClose={action('Close')}
        />
    ));
