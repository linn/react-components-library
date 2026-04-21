import { fn } from 'storybook/test';
import Search from './Search';

const sampleResults = [
    { id: 1, name: 'Widget A', description: 'A standard widget' },
    { id: 2, name: 'Widget B', description: 'An improved widget' },
    { id: 3, name: 'Gadget Pro', description: 'Professional gadget' }
];

export default {
    title: 'Components/Search',
    component: Search,
    tags: ['autodocs'],
    args: {
        propertyName: 'item',
        label: 'Search items',
        value: '',
        handleValueChange: fn(),
        disabled: false,
        search: fn(),
        searchResults: [],
        loading: false,
        priorityFunction: null,
        onResultSelect: fn(),
        resultLimit: null,
        resultsInModal: false,
        clearSearch: fn(),
        searchOnEnter: true,
        helperText: 'PRESS ENTER TO SEARCH',
        autoFocus: false,
        visible: true,
        displayChips: false,
        fullWidth: false,
        handleOnBlur: null
    }
};

export const Default = {};

export const WithResults = {
    name: 'With search results',
    args: {
        value: 'widget',
        searchResults: sampleResults
    }
};

export const Loading = {
    args: {
        loading: true,
        value: 'widget'
    }
};

export const Disabled = {
    args: {
        disabled: true
    }
};

export const FullWidth = {
    name: 'Full width',
    args: {
        fullWidth: true
    }
};

export const WithChips = {
    name: 'With chips',
    args: {
        displayChips: true,
        value: 'widget',
        searchResults: sampleResults.map(r => ({
            ...r,
            chips: [{ text: `ID: ${r.id}`, color: '#e3f2fd' }]
        }))
    }
};
