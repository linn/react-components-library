/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Title from '../components/Title';

export default {
    title: 'Components/Title',
    decorators: [story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>],
    component: Title
};

export const Default = args => <Title {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    text: 'Title Text'
};
