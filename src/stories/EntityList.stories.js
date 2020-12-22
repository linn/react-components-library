import React from 'react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import Page from '../components/Page';
import EntityList from '../components/EntityList';
import providers from './renderUtils/Providers';

const entities = [
    {
        id: 'First entity',
        description: 'This links to a url within this app',
        href: '/products/maint/entity/1'
    },
    { id: 'Second entity', description: 'This links to an external url', href: '/entity/2' }
];

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/Entities'
        }
    }
};

export default {
    title: 'EntityList',

    decorators: [
        story => <Page {...pageProps}>{story()}</Page>,
        withKnobs,
        StoryRouter(),
        story => providers(story)
    ]
};

export const Default = () => (
    <EntityList
        title="Entities"
        entityId="id"
        descriptionFieldName={text('descriptionFieldName', null)}
        hasExternalLinks={boolean('hasExternalLinks', true)}
        entityList={object('entities', entities)}
    />
);

Default.story = {
    name: 'default '
};

export const WithDescriptions = () => (
    <EntityList
        title="Entities"
        entityList={entities}
        entityId="id"
        descriptionFieldName={text('descriptionFieldName', 'description')}
    />
);

WithDescriptions.story = {
    name: 'with descriptions'
};

export const WithExternalLinks = () => (
    <EntityList
        title="Entities"
        entityList={entities}
        entityId="id"
        hasExternalLinks
        descriptionFieldName={text('descriptionFieldName', 'description')}
    />
);

WithExternalLinks.story = {
    name: 'with external Links'
};
