import { useArgs } from 'storybook/preview-api';
import LedgerPeriodAutoComplete from './LedgerPeriodAutoComplete';

const periods = [
    { periodNumber: 1524, monthName: 'DEC2026' },
    { periodNumber: 1521, monthName: 'SEP2026' },
    { periodNumber: 1522, monthName: 'OCT2026' },
    { periodNumber: 1523, monthName: 'NOV2026' }
];

function StatefulLedgerPeriodAutoComplete(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
        <LedgerPeriodAutoComplete
            {...args}
            value={value}
            onChange={newValue => updateArgs({ value: newValue })}
        />
    );
}

const description = `
A preset over [\`AutoComplete\`](?path=/docs/components-autocomplete--docs) for picking a **ledger
period**. Pass the raw ledger-period list (e.g. finance's \`GET /ledgers/periods\`) and a numeric
\`periodNumber\`; you get a \`periodNumber\` (or null) back. Options are sorted by \`periodNumber\` and
labelled by \`monthName\`, and can be narrowed with \`filter\` (e.g. this month onwards).

UX: type to filter, or **type the period number then Tab/blur** to commit the match.
`;

export default {
    title: 'Components/LedgerPeriodAutoComplete',
    component: LedgerPeriodAutoComplete,
    tags: ['autodocs'],
    parameters: {
        docs: { description: { component: description } }
    },
    render: StatefulLedgerPeriodAutoComplete,
    args: {
        label: 'Month',
        periods,
        value: null,
        required: false,
        disabled: false,
        disableClearable: false
    }
};

export const Default = {};

export const Preselected = {
    args: {
        value: 1522
    }
};

export const FromThisMonth = {
    name: 'Filtered (this month onwards)',
    args: {
        filter: period => period.periodNumber >= 1522
    }
};
