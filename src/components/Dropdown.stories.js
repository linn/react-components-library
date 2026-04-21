import { fn } from 'storybook/test';
import Dropdown from './Dropdown';

const colourItems = [
    { id: 'red', displayText: 'Red' },
    { id: 'green', displayText: 'Green' },
    { id: 'blue', displayText: 'Blue' }
];

const stringItems = ['Option A', 'Option B', 'Option C'];

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        propertyName: 'colour',
        label: 'Colour',
        items: colourItems,
        value: '',
        disabled: false,
        error: false,
        required: false,
        allowNoValue: true,
        fullWidth: false,
        helperText: ''
    }
};

export const Default = {};

export const WithSelectedValue = {
    name: 'With selected value',
    args: {
        value: 'green'
    }
};

export const StringItems = {
    name: 'String items',
    args: {
        label: 'Category',
        propertyName: 'category',
        items: stringItems,
        value: 'Option B'
    }
};

export const NoBlankOption = {
    name: 'No blank option',
    args: {
        allowNoValue: false,
        value: 'red'
    }
};

export const WithHelperText = {
    name: 'With helper text',
    args: {
        helperText: 'Choose a colour from the list',
        value: 'blue'
    }
};

export const ErrorState = {
    name: 'Error state',
    args: {
        error: true,
        helperText: 'A selection is required',
        value: ''
    }
};

export const Disabled = {
    args: {
        value: 'red',
        disabled: true
    }
};

export const Required = {
    args: {
        required: true,
        label: 'Required Colour'
    }
};

export const Loading = {
    args: {
        optionsLoading: true,
        label: 'Loading options...'
    }
};
