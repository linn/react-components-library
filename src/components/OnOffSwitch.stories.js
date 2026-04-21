import { fn } from 'storybook/test';
import OnOffSwitch from './OnOffSwitch';

export default {
    title: 'Components/OnOffSwitch',
    component: OnOffSwitch,
    tags: ['autodocs'],
    args: {
        onChange: fn(),
        propertyName: 'featureEnabled',
        label: 'Enable feature',
        value: false,
        disabled: false
    }
};

export const Off = {
    args: {
        value: false
    }
};

export const On = {
    args: {
        value: true,
        label: 'Feature enabled'
    }
};

export const Disabled = {
    args: {
        value: false,
        disabled: true,
        label: 'Locked setting'
    }
};

export const DisabledOn = {
    name: 'Disabled (on)',
    args: {
        value: true,
        disabled: true,
        label: 'Locked setting (on)'
    }
};
