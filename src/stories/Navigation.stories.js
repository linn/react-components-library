import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Navigation from '../components/Navigation';
import providers from './renderUtils/Providers';
import menu from '../../public/menu.json';

const stories = storiesOf('Navigation', module);
stories.addDecorator(StoryRouter()).addDecorator(story => providers(story));

stories.add('default', () =>
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
    ))
);
