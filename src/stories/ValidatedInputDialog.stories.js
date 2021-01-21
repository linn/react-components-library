/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        story => providers(story)
    ],
    component: ValidatedInputDialog
};

export const WhenValid = args => <ValidatedInputDialog {...args} />;

WhenValid.story = {
    name: 'When Valid'
};

WhenValid.args = {
    title: 'In this case matches are found',
    loading: false,
    fetchItems,
    searchItems: validSinceOneMatchingItem,
    clearSearch,
    onAccept: onSelect
};

export const WhenInvalid = args => <ValidatedInputDialog {...args} />;

WhenInvalid.story = {
    name: 'When Invalid'
};

WhenInvalid.args = {
    title: 'In this case no matches are found',
    loading: false,
    fetchItems,
    searchItems: invalidSinceNoMatchingItemsFound,
    clearSearch,
    onAccept: onSelect
};
