import React from 'react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs';
import Page from '../components/Page';
import Title from '../components/Title';
import providers from './renderUtils/Providers';

const props = {
    history: {
        push: () => {},
        location: {
            pathname: '/a/test/path'
        }
    }
};

export default {
    title: 'Page',
    decorators: [withKnobs, StoryRouter(), story => providers(story)]
};

export const Default = () => (
    <Page history={object('location', props.history)}>
        <Title text="Page Content Here" />
    </Page>
);

Default.story = {
    name: 'default'
};
