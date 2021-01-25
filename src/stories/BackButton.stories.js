/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';

import BackButton from '../components/BackButton';

const actions = {
    backClick: action('Back')
};

export default {
    title: 'Components/BackButton',
    decorators: [
        story => <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
    ],
    component: BackButton
};

export const Default = args => <BackButton {...actions} {...args} />;

Default.story = {
    name: 'default'
};
