import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('EntityList', module)
    .addDecorator(story => <Page {...pageProps}>{story()}</Page>)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .addDecorator(story => providers(story))
    .add('default ', () => (
        <EntityList
            title="Entities"
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', null)}
            hasExternalLinks={boolean('hasExternalLinks', true)}
            entityList={object('entities', entities)}
        />
    ))
    .add('with descriptions', () => (
        <EntityList
            title="Entities"
            entityList={entities}
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', 'description')}
        />
    ))
    .add('with external Links', () => (
        <EntityList
            title="Entities"
            entityList={entities}
            entityId="id"
            hasExternalLinks
            descriptionFieldName={text('descriptionFieldName', 'description')}
        />
    ));
