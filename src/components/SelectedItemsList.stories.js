import { fn } from 'storybook/test';
import SelectedItemsList from './SelectedItemsList';

const sampleItems = [
    { id: 1, displayText: 'Widget A' },
    { id: 2, displayText: 'Widget B' },
    { id: 3, displayText: 'Gadget Pro' }
];

const stringItems = ['Apple', 'Banana', 'Cherry'];

export default {
    title: 'Components/SelectedItemsList',
    component: SelectedItemsList,
    tags: ['autodocs'],
    args: {
        items: sampleItems,
        removeItem: fn(),
        title: 'Items Selected',
        maxHeight: null
    }
};

export const Default = {};

export const StringItems = {
    name: 'String items',
    args: {
        items: stringItems,
        title: 'Selected Options'
    }
};

export const WithMaxHeight = {
    name: 'With max height',
    args: {
        items: [
            { id: 1, displayText: 'Item 1' },
            { id: 2, displayText: 'Item 2' },
            { id: 3, displayText: 'Item 3' },
            { id: 4, displayText: 'Item 4' },
            { id: 5, displayText: 'Item 5' }
        ],
        maxHeight: 150
    }
};

export const NoRemoveButton = {
    name: 'No remove button',
    args: {
        removeItem: null
    }
};

export const Empty = {
    args: {
        items: [],
        title: 'No items selected'
    }
};
