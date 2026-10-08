import { useArgs } from 'storybook/preview-api';
import AutoComplete from './AutoComplete';

const departments = [
    { departmentCode: 2508, description: 'Assets' },
    { departmentCode: 3100, description: 'Marketing' },
    { departmentCode: 4200, description: 'Research & Development' },
    { departmentCode: 5000, description: 'Operations' }
];

function StatefulAutoComplete(args) {
    const [{ value }, updateArgs] = useArgs();
    return (
        <AutoComplete
            {...args}
            value={value}
            onChange={newValue => updateArgs({ value: newValue })}
        />
    );
}

const description = `
A reusable type-ahead select (wrapper over MUI \`Autocomplete\`). Two modes: **object mode** (you supply
the callbacks and work in option objects) and **id/label mode** (you supply two field names and work in
plain ids).

UX: type to filter, and **type a value then Tab/blur to commit the match** (matched by option label,
case-insensitive, or by \`matchesInput\` / the \`idField\` value).

### Id/label mode (give two field names, value is the id)

Use for a plain coded list. No callbacks, no \`find\` — \`value\`/\`onChange\` speak the id:

\`\`\`jsx
// departments: [{ departmentCode: 2508, description: 'Assets' }, ...]
<AutoComplete
    label="Department"
    options={departments}
    idField="departmentCode"       // the id property
    labelField="description"       // the text property
    value={departmentCode}         // a plain id (or null)
    onChange={setDepartmentCode}   // receives a plain id (or null)
/>
\`\`\`

The mode derives \`getOptionLabel\`, \`isOptionEqualToValue\`, \`matchesInput\`, and value resolution for
you. You can still override any derived callback by passing it explicitly.

### Object mode (supply the callbacks, value is the object)

Use when you need full control — e.g. the label is computed or equality spans more than one field:

\`\`\`jsx
<AutoComplete
    label="Start Period"
    options={startPeriodOptions}                 // array of period objects
    value={selectedStartPeriod}                  // the selected OBJECT (or null)
    getOptionLabel={option => option.monthName ?? String(option.periodNumber)}
    isOptionEqualToValue={(option, value) => option.periodNumber === value.periodNumber}
    matchesInput={(period, typed) => String(period.periodNumber) === typed}
    onChange={period => setField('startPeriod', period?.periodNumber ?? null)}
    required
/>
\`\`\`

> Rule of thumb: pass \`idField\` + \`labelField\` for a simple coded list and work in ids. Only drop to
> object mode when the label/equality/match logic is non-trivial (computed label, multi-field match).
`;

export default {
    title: 'Components/AutoComplete',
    component: AutoComplete,
    tags: ['autodocs'],
    parameters: {
        docs: { description: { component: description } }
    },
    render: StatefulAutoComplete,
    args: {
        label: 'Department',
        options: departments,
        idField: 'departmentCode',
        labelField: 'description',
        value: null,
        required: false,
        disabled: false,
        disableClearable: false
    }
};

export const IdLabelMode = {
    name: 'Id/label mode'
};

export const Preselected = {
    args: {
        value: 3100
    }
};

export const Required = {
    args: {
        required: true
    }
};

export const Disabled = {
    args: {
        value: 2508,
        disabled: true
    }
};

export const ObjectMode = {
    name: 'Object mode',
    render: StatefulAutoComplete,
    args: {
        label: 'Department',
        options: departments,
        idField: undefined,
        labelField: undefined,
        value: null,
        getOptionLabel: option => option?.description ?? '',
        isOptionEqualToValue: (option, selected) =>
            option.departmentCode === selected?.departmentCode,
        matchesInput: (option, typed) => String(option.departmentCode) === typed
    }
};
