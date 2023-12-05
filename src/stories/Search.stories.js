import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import Search from '../components/Search';
import SearchDocs from './SearchDocs.mdx';

const actions = {
    onSelect: action('onSelect'),
    search: action('search'),
    clearSearch: action('sclearSearch')
};

const defaultArgs = {
    propertyName: 'property',
    label: 'Results Inline',
    searchResults: [
        { id: 'a', name: 'A', description: 'A Result' },
        { id: 'b', name: 'b', description: 'B Result' },
        { id: 'c', name: 'c', description: 'C Result' },
        { id: 'd', name: 'd', description: 'D Result' }
    ]
};

export default {
    title: 'Components/Search',
    parameters: {
        docs: {
            page: SearchDocs
        }
    },
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: Search
};

export const resultsInline = args => {
    const [value, setValue] = useState('result');
    return (
        <Search
            {...args}
            {...actions}
            value={value}
            handleValueChange={(_, newValue) => setValue(newValue)}
        />
    );
};

resultsInline.story = {
    name: 'Results Inline'
};

resultsInline.args = {
    ...defaultArgs
};

export const withChips = args => {
    const [value, setValue] = useState('result');
    return (
        <Search
            {...args}
            {...actions}
            value={value}
            handleValueChange={(_, newValue) => setValue(newValue)}
        />
    );
};

withChips.story = {
    name: 'With Chips'
};

withChips.args = {
    ...defaultArgs,
    displayChips: true,
    searchResults: [
        {
            id: 'a',
            name: 'A',
            description: 'A Result has chips',
            chips: [{ text: 'chip 1' }, { text: 'chip 2' }, { text: 'chip 3' }]
        },
        {
            id: 'b',
            name: 'b',
            description: 'B Result has chips',
            chips: [{ text: 'cool', color: 'green' }]
        },
        { id: 'c', name: 'c', description: 'C Result no chips' },
        {
            id: 'd',
            name: 'd',
            description: 'D Result has chips',
            chips: [{ text: 'not cool', color: 'red' }]
        }
    ]
};

export const autoFocus = args => {
    const [value, setValue] = useState('result');
    return (
        <Search
            {...args}
            {...actions}
            value={value}
            autoFocus
            handleValueChange={(_, newValue) => setValue(newValue)}
        />
    );
};

autoFocus.story = {
    name: 'AutoFocus'
};

autoFocus.args = {
    ...defaultArgs
};

export const resultsInModal = args => {
    const [value, setValue] = useState('result');
    return (
        <Search
            {...args}
            {...actions}
            resultsInModal
            value={value}
            handleValueChange={(_, newValue) => setValue(newValue)}
        />
    );
};

resultsInModal.story = {
    name: 'Results In Modal'
};

resultsInModal.args = {
    ...defaultArgs
};
