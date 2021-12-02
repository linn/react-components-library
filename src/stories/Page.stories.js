/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Page from '../components/Page';
import Title from '../components/Title';
import providers from './renderUtils/Providers';

export default {
    title: 'Components/Page',
    decorators: [(story) => providers(story)],
    component: Page
};

export const Default = (args) => (
    <Page {...args}>
        <Title text="Page Content Here" />
    </Page>
);

Default.story = {
    name: 'default'
};

Default.args = {
    history: {
        push: () => {},
        location: {
            pathname: '/a/test/path'
        }
    }
};
