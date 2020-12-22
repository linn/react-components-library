import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs';

import Title from '../components/Title';

export default {
    title: 'Components/Title',

    decorators: [
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        withKnobs
    ]
};

export const Default = () => <Title text={text('text', 'Title Text')} />;

Default.story = {
    name: 'default '
};
