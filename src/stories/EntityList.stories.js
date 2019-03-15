import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import Page from '../components/Page';
import EntityList from '../components/EntityList';

const entities = [
    {
        id: 'First entity',
        description: 'This links to a url within this app',
        href: '/products/maint/entity/1'
    },
    { id: 'Second entity', description: 'This links to an external url', href: '/entity/2' }
];

const appRoutes = ['/products/maint'];

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
    .add('default ', () => (
        <EntityList
            appRoutes={appRoutes}
            title="Entities"
            entityList={entities}
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', null)}
        />
    ))
    .add('with descriptions', () => (
        <EntityList
            appRoutes={appRoutes}
            title="Entities"
            entityList={entities}
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', 'description')}
        />
    ));
