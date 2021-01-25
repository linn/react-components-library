/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Navigation from '../components/Navigation';
import providers from './renderUtils/Providers';
import menu from '../../public/menu.json';

export default {
    title: 'Components/Navigation',
    decorators: [story => providers(story)],
    component: Navigation
};

export const Default = args => <Navigation {...args} />;

Default.story = {
    name: 'default'
};

Default.args = {
    sections: menu.sections,
    myStuff: menu.myStuff,
    username: 'username',
    loading: false,
    authRoot: '#',
    history: {},
    markNotificationSeen: () => {}
};
