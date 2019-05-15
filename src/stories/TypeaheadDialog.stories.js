import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';

import TypeaheadDialog from '../components/TypeaheadDialog';

const items = [
    { id: '1', name: 'Item 1', href: '/1', description: 'Description of item 1' },
    { id: '2', name: 'Item 2', href: '/2', description: 'Description of item 2' },
    { id: '3', name: 'Item 3', href: '/3', description: 'Description of item 3' }
];

const fetchItems = () => {};

const clearSearch = () => {};

const onSelect = () => {};

storiesOf('Typeahead', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>)
    .addDecorator(withKnobs)

    .add('default ', () => (
        <TypeaheadDialog
            title={text('title', 'Title Text')}
            loading={boolean('loading', false)}
            fetchItems={fetchItems}
            searchItems={array('items', items)}
            clearSearch={clearSearch}
            onSelect={onSelect}
        />
    ));
