import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import OnOffSwitch from '../components/OnOffSwitch';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'OnOffSwitch',
    decorators: [story => <div>{story()}</div>, withKnobs]
};

export const Default = () => (
    <OnOffSwitch
        label={text('label', 'Label')}
        value={boolean('value', false)}
        disabled={boolean('disabled', false)}
        {...actions}
        propertyName=""
    />
);

Default.story = {
    name: 'default '
};
