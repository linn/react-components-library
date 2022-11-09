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

export const ResultsInline = args => {
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

ResultsInline.story = {
    name: 'Results Inline'
};

ResultsInline.args = {
    ...defaultArgs
};

export const ResultsInModal = args => {
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

ResultsInModal.story = {
    name: 'Results In Modal'
};

ResultsInModal.args = {
    ...defaultArgs
};
