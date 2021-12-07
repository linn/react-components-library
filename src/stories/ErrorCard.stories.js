/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ErrorCard from '../components/ErrorCard';

export default {
    title: 'Components/ErrorCard',
    decorators: [(story) => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>],
    component: ErrorCard
};

export const Default = (args) => <ErrorCard {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    errorMessage: 'Error Message'
};
