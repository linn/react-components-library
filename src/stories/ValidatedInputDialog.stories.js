import React from 'react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import providers from './renderUtils/Providers';

import ValidatedInputDialog from '../components/ValidatedInputDialog';

const invalidSinceNoMatchingItemsFound = [];

const validSinceOneMatchingItem = [
    { id: '1', name: 'Item 1', href: '/1', description: 'Description of item 1' }
];

const fetchItems = () => {};

const clearSearch = () => {};

const onSelect = () => {};

export default {
    title: 'Components/ValidatedInputDialog',

    decorators: [
        StoryRouter(),
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        withKnobs,
        story => providers(story)
    ]
};

export const WhenInvalid = () => (
    <ValidatedInputDialog
        title={text('title', 'In this case no matches are found')}
        loading={boolean('loading', false)}
        fetchItems={fetchItems}
        searchItems={array('items', invalidSinceNoMatchingItemsFound)}
        clearSearch={clearSearch}
        onAccept={onSelect}
    />
);

export const WhenValid = () => (
    <ValidatedInputDialog
        title={text('title', 'In this Case Matches are found')}
        loading={boolean('loading', false)}
        fetchItems={fetchItems}
        searchItems={array('items', validSinceOneMatchingItem)}
        clearSearch={clearSearch}
        onAccept={onSelect}
    />
);
