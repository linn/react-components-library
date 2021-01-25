/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import Page from '../components/Page';
import EntityList from '../components/EntityList';
import providers from './renderUtils/Providers';

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/Entities'
        }
    }
};

export default {
    title: 'Components/EntityList',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <Page {...pageProps}>{story()}</Page>
            </MemoryRouter>
        ),
        story => providers(story)
    ],
    component: EntityList
};

export const Default = args => <EntityList {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    title: 'Entities',
    entityId: 'id',
    descriptionFieldName: null,
    hasExternalLinks: true,
    entityList: [
        {
            id: 'First entity',
            description: 'This links to a url within this app',
            href: '/products/maint/entity/1'
        },
        { id: 'Second entity', description: 'This links to an external url', href: '/entity/2' }
    ]
};

export const WithDescriptions = args => <EntityList {...args} />;

WithDescriptions.story = {
    name: 'with descriptions'
};

WithDescriptions.args = {
    descriptionFieldName: 'description'
};

export const WithExternalLinks = args => <EntityList {...args} />;

WithExternalLinks.story = {
    name: 'with external Links'
};

WithExternalLinks.args = {
    hasExternalLinks: true
};
