import { useArgs } from 'storybook/preview-api';
import OnOffSwitch from './OnOffSwitch';

function StatefulOnOffSwitch(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
        <OnOffSwitch
            {...args}
            value={value}
            onChange={(propertyName, newValue) => updateArgs({ value: newValue })}
        />
    );
}

export default {
    title: 'Components/OnOffSwitch',
    component: OnOffSwitch,
    tags: ['autodocs'],
    render: StatefulOnOffSwitch,
    args: {
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
