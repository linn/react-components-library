import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CheckboxWithLabel from '../components/CheckboxWithLabel';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'CheckboxWithLabel',
    decorators: [story => <div>{story()}</div>, withKnobs]
};

export const Default = () => (
    <CheckboxWithLabel
        checked={boolean('checked', true)}
        color={text('color', 'primary')}
        label={text('label', 'Checkbox Label')}
        {...actions}
    />
);

Default.story = {
    name: 'default '
};
