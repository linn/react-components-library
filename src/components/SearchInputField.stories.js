import { fn } from 'storybook/test';
import SearchInputField from './SearchInputField';

export default {
    title: 'Components/SearchInputField',
    component: SearchInputField,
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        propertyName: 'searchTerm',
        label: 'Search',
        value: '',
        disabled: false,
        error: false,
        fullWidth: false,
        helperText: '',
        placeholder: 'Enter search term...'
    }
};

export const Default = {};

export const WithValue = {
    name: 'With value',
    args: {
        value: 'widget',
        label: 'Search products'
    }
};

export const FullWidth = {
    name: 'Full width',
    args: {
        fullWidth: true,
        label: 'Search',
        placeholder: 'Type to search...'
    }
};

export const Disabled = {
    args: {
        disabled: true,
        label: 'Search (unavailable)',
        value: ''
    }
};

export const WithHelperText = {
    name: 'With helper text',
    args: {
        helperText: 'Enter at least 3 characters',
        label: 'Search items'
    }
};
