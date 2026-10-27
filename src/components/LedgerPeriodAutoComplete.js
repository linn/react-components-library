import React from 'react';
import AutoComplete from './AutoComplete.js';
import utilities from '../utilities/index.js';

// Ledger-period binding over the generic AutoComplete. Callers pass the raw ledger-period list and a
// numeric periodNumber as the value, and get a numeric periodNumber (or null) back from onChange — they
// never touch the period objects or repeat the (identical everywhere) label/equality/match callbacks.
// A ledger period is identified by its periodNumber and displayed by its monthName; options are sorted
// by periodNumber and can be narrowed with an optional filter (e.g. periods on/after the current one).
function LedgerPeriodAutoComplete({
    label,
    periods = [],
    value,
    onChange,
    filter,
    required = false,
    disabled = false,
    disableClearable = false
}) {
    const options = utilities
        .sortEntityList(periods ?? [], 'periodNumber')
        .filter(period => (filter ? filter(period) : true));

    return (
        <AutoComplete
            label={label}
            options={options}
            idField="periodNumber"
            labelField="monthName"
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            disableClearable={disableClearable}
        />
    );
}

export default LedgerPeriodAutoComplete;
