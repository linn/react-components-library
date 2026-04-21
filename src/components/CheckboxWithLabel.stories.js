import { fn } from 'storybook/test';
import CheckboxWithLabel from './CheckboxWithLabel';

export default {
    title: 'Components/CheckboxWithLabel',
    component: CheckboxWithLabel,
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        label: 'Accept terms and conditions',
        checked: false,
        color: 'primary'
    }
};

export const Default = {};

export const Checked = {
    args: {
        checked: true,
        label: 'Subscribe to newsletter'
    }
};

export const Unchecked = {
    args: {
        checked: false,
        label: 'Subscribe to newsletter'
    }
};

export const SecondaryColour = {
    name: 'Secondary colour',
    args: {
        checked: true,
        color: 'secondary',
        label: 'Secondary checkbox'
    }
};
