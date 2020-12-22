import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ErrorCard from '../components/ErrorCard';

export default {
    title: 'Components/ErrorCard',

    decorators: [
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        withKnobs
    ]
};

export const Default = () => <ErrorCard errorMessage={text('errorMessage', 'Error message')} />;

Default.story = {
    name: 'default '
};
