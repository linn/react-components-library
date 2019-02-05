import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import Page from '../components/Page';
import EntityList from '../components/EntityList';

const entities = [
    { id: 'First entity', description: 'The first item in the list', href: '/entity/1' },
    { id: 'Second entity', description: 'The second item in the list', href: '/entity/2' },
    { id: 'Third entity', description: 'The third item in the list', href: '/entity/3' },
    { id: 'Fourth entity', description: 'The fourth item in the list', href: '/entity/4' }
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
    .add('default ', () => (
        <EntityList
            title="Entities"
            entityList={entities}
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', null)}
        />
    ))
    .add('with descriptions', () => (
        <EntityList
            title="Entities"
            entityList={entities}
            entityId="id"
            descriptionFieldName={text('descriptionFieldName', 'description')}
        />
    ));
