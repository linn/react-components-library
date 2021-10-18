/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import Typeahead from '../components/Typeahead';

const items = [
    { id: '1', name: 'Item 1', href: '/1', description: 'Description of item 1' },
    { id: '2', name: 'Item 2', href: '/2', description: 'Description of item 2' },
    { id: '3', name: 'Item 3', href: '/3', description: 'Description of item 3' }
];

const fetchItems = () => {};

const clearSearch = () => {};

export default {
    title: 'Components/Typeahead',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <ThemeProvider theme={linnTheme}>
                    <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
                </ThemeProvider>
            </MemoryRouter>
        )
    ],
    component: Typeahead
};

export const Sorted = args => <Typeahead {...args} />;

Sorted.story = {
    name: 'when sort function supplied'
};

Sorted.args = {
    title: 'Title Text',
    loading: false,
    fetchItems,
    items: [
        { id: '2', name: 'Item 2', href: '/1', description: '2 - second' },
        { id: '3', name: 'Item 3', href: '/2', description: '3 - third' },
        { id: '1', name: 'Item 1', href: '/3', description: '1 - first' }
    ],
    clearSearch,
    debounce: 500,
    sortFunction: _ => (a, b) => {
        if (a.description < b.description) {
            return -1;
        }
        if (a.description > b.description) {
            return 1;
        }
        return 0;
    }
};

export const SortedUsingSearchTerm = args => <Typeahead {...args} />;

SortedUsingSearchTerm.story = {
    name: 'when sortFunction supplied that uses the searchTerm in the sort'
};

SortedUsingSearchTerm.args = {
    title: 'Title Text',
    loading: false,
    fetchItems,
    items: [
        { id: '2', name: 'Item 2', href: '/1', description: '2 - second' },
        { id: '3', name: 'Item 3', href: '/2', description: '3 - third' },
        { id: '1', name: 'Item 1', href: '/3', description: '1 - first' }
    ],
    clearSearch,
    debounce: 500,
    sortFunction: searchTerm => (_, b) => {
        if (b.description.includes(searchTerm)) {
            return 1;
        }
        return -1;
    }
};

export const Default = args => <Typeahead {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    title: 'Title Text',
    loading: false,
    fetchItems,
    items,
    clearSearch,
    debounce: 500,
    sortFunction: _ => (a, b) => {
        if (a.description > b.description) {
            return -1;
        }
        if (a.description < b.description) {
            return 1;
        }
        return 0;
    }
};

export const NothingFound = args => <Typeahead {...args} />;

NothingFound.story = {
    name: 'nothingFound '
};

NothingFound.args = {
    title: 'Title Text',
    loading: false,
    fetchItems,
    items: [],
    clearSearch
};

export const Loading = args => <Typeahead {...args} />;

Loading.story = {
    name: 'loading '
};

Loading.args = {
    title: 'Title Text',
    loading: true,
    fetchItems,
    items,
    clearSearch
};

export const Modal = args => <Typeahead {...args} />;

Modal.story = {
    name: 'modal '
};

Modal.args = {
    title: 'Title Text',
    loading: true,
    fetchItems,
    items,
    clearSearch,
    modal: true
};

export const ModalButton = args => <Typeahead {...args} />;

ModalButton.story = {
    name: 'modal searchButtonOnly'
};

ModalButton.args = {
    title: 'Title Text',
    loading: true,
    fetchItems,
    items,
    clearSearch,
    modal: true,
    searchButtonOnly: true
};
