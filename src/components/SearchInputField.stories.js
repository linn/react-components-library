import { useArgs } from 'storybook/preview-api';
import SearchInputField from './SearchInputField';

function StatefulSearchInputField(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
        <SearchInputField
            {...args}
            value={value}
            onChange={(propertyName, newValue) => updateArgs({ value: newValue })}
        />
    );
}

export default {
    title: 'Components/SearchInputField',
    component: SearchInputField,
    tags: ['autodocs'],
    render: StatefulSearchInputField,
    args: {
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
