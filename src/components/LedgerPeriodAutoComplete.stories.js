import { useArgs } from 'storybook/preview-api';
import LedgerPeriodAutoComplete from './LedgerPeriodAutoComplete';

const periods = [
    { periodNumber: 1524, monthName: 'DEC2026' },
    { periodNumber: 1521, monthName: 'SEP2026' },
    { periodNumber: 1522, monthName: 'OCT2026' },
    { periodNumber: 1523, monthName: 'NOV2026' }
];

// Two full years of periods so the ±1 year (double) chevrons have somewhere to land.
const twoYearsOfPeriods = Array.from({ length: 24 }, (_, i) => {
    const monthNames = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC'
    ];
    return {
        periodNumber: 1500 + i,
        monthName: `${monthNames[i % 12]}${2025 + Math.floor(i / 12)}`
    };
});

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

A cluster of chevrons to the right of the field lets a mouse user walk the value **±1 month** (single
chevron) or **±1 year** (double chevron) in one click. Stepping is index-based over the sorted, filtered
options, so it honours any \`filter\` and gaps, clamps at both ends, and greys out a step that would run
off the range (or a year step without a full twelve periods that way). The chevrons fade in on
hover/focus so the control is no bigger at rest than the plain field. They're shown by default; pass
\`showSteppers={false}\` to opt a field out.

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
        disableClearable: false,
        showSteppers: true
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

export const WithSteppers = {
    name: 'Steppers (hover the field)',
    args: {
        periods: twoYearsOfPeriods,
        value: 1512
    }
};

export const WithoutSteppers = {
    args: {
        value: 1522,
        showSteppers: false
    }
};
