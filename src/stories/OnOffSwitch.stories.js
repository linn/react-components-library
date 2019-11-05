import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import OnOffSwitch from '../components/OnOffSwitch';

const actions = {
    onChange: action('onChange')
};

storiesOf('OnOffSwitch', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <OnOffSwitch
            label={text('label', 'Label')}
            value={boolean('value', false)}
            disabled={boolean('disabled', false)}
            {...actions}
            propertyName=""
        />
    ));
