import { useArgs } from 'storybook/preview-api';
import CheckboxWithLabel from './CheckboxWithLabel';

function StatefulCheckbox(args) {
    const [{ checked }, updateArgs] = useArgs();
    return (
        <CheckboxWithLabel
            {...args}
            checked={checked}
            onChange={(event, newChecked) => updateArgs({ checked: newChecked })}
        />
    );
}

export default {
    title: 'Components/CheckboxWithLabel',
    component: CheckboxWithLabel,
    tags: ['autodocs'],
    render: StatefulCheckbox,
    args: {
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
