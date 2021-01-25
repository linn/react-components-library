/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';

import OnOffSwitch from '../components/OnOffSwitch';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'Components/OnOffSwitch',
    decorators: [story => <div>{story()}</div>],
    component: OnOffSwitch
};

export const Default = args => <OnOffSwitch {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    label: 'Label',
    value: false,
    disabled: false,
    propertyName: ''
};
