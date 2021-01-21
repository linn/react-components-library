/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ExportButton from '../components/ExportButton';

export default {
    title: 'Components/ExportButton',
    decorators: [story => <div style={{ position: 'absolute', left: '50%' }}>{story()}</div>],
    component: ExportButton
};

export const Default = args => <ExportButton {...args} />;

Default.story = {
    name: 'default'
};

Default.args = {
    text: '/href/',
    href: ''
};
