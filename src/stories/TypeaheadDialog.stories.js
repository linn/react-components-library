/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import providers from './renderUtils/Providers';
import TypeaheadDialog from '../components/TypeaheadDialog';
import Chip from '@mui/material/Chip';

const items = [
    {
        id: '1',
        name: 'Item 1',
        href: '/1',
        description: (
            <div>
                Description of item 1 <Chip label="HELLO" />
            </div>
        )
    },
    { id: '2', name: 'Item 2', href: '/2', description: 'Description of item 2' },
    { id: '3', name: 'Item 3', href: '/3', description: 'Description of item 3' }
];

const fetchItems = () => {};

const clearSearch = () => {};

const onSelect = () => {};

export default {
    title: 'Components/TypeaheadDialog',
    decorators: [
        story => <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>,
        story => providers(story)
    ],
    component: TypeaheadDialog
};

export const Default = args => <TypeaheadDialog {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    title: 'Title Text',
    loading: false,
    fetchItems,
    searchItems: items,
    clearSearch,
    onSelect
};
