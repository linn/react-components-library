import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import SaveBackCancelButtons from '../components/SaveBackCancelButtons';

const actions = {
    saveClick: action('Saved'),
    cancelClick: action('Cancelled'),
    backClick: action('Back')
};

storiesOf('SaveBackCancelButtons', module)
    .addDecorator(story => (
        <div style={{ position: 'absolute', right: '50%', top: '50%' }}>{story()}</div>
    ))
    .addDecorator(withKnobs)
    .add('default', () => <SaveBackCancelButtons {...actions} />)
    .add('saveDisabled', () => <SaveBackCancelButtons {...actions} saveDisabled />);
