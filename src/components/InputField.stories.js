import { fn } from 'storybook/test';
import InputField from './InputField';

export default {
    title: 'Components/InputField',
    component: InputField,
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        propertyName: 'exampleField',
        label: 'Label',
        value: '',
        disabled: false,
        error: false,
        required: false,
        fullWidth: false,
        helperText: '',
        placeholder: '',
        type: 'text'
    }
};

export const Default = {};

export const WithValue = {
    name: 'With value',
    args: {
        value: 'Hello world',
        label: 'First Name'
    }
};

export const NumberField = {
    name: 'Number field',
    args: {
        type: 'number',
        label: 'Quantity',
        value: 42,
        decimalPlaces: 2
    }
};

export const WithHelperText = {
    name: 'With helper text',
    args: {
        label: 'Email',
        helperText: 'Enter your work email address',
        placeholder: 'name@example.com'
    }
};

export const WithAdornment = {
    name: 'With adornment',
    args: {
        label: 'Price',
        adornment: '£',
        type: 'number',
        value: 9.99
    }
};

export const ErrorState = {
    name: 'Error state',
    args: {
        label: 'Username',
        value: 'bad_input!!',
        error: true,
        helperText: 'Invalid characters'
    }
};

export const Disabled = {
    args: {
        label: 'Read-only field',
        value: 'Cannot change this',
        disabled: true
    }
};

export const Required = {
    args: {
        label: 'Required field',
        required: true,
        placeholder: 'This field is required'
    }
};

export const MultilineField = {
    name: 'Multiline field',
    args: {
        label: 'Notes',
        rows: 4,
        value: 'Some longer text\nthat spans multiple lines.',
        fullWidth: true
    }
};
