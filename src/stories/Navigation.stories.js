import React from 'react';
import StoryRouter from 'storybook-react-router';
import Navigation from '../components/Navigation';
import providers from './renderUtils/Providers';
import menu from '../../public/menu.json';

export default {
    title: 'Components/Navigation',
    decorators: [StoryRouter(), story => providers(story)],
    component: Navigation
};

export const Default = () =>
    React.createElement(() => (
        <Navigation
            sections={menu.sections}
            myStuff={menu.myStuff}
            username="username"
            loading={false}
            markNotificationSeen={() => {}}
            history={{}}
            authRoot="#"
        />
    ));

Default.story = {
    name: 'default'
};
