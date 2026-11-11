import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AutoComplete from './AutoComplete.js';
import utilities from '../utilities/index.js';

// Ledger-period binding over the generic AutoComplete. Callers pass the raw ledger-period list and a
// numeric periodNumber as the value, and get a numeric periodNumber (or null) back from onChange — they
// never touch the period objects or repeat the (identical everywhere) label/equality/match callbacks.
// A ledger period is identified by its periodNumber and displayed by its monthName; options are sorted
// by periodNumber and can be narrowed with an optional filter (e.g. periods on/after the current one).
//
// A cluster of chevrons to the right of the field lets a mouse user walk the value ±1 month (single
// chevron) or ±1 year (double chevron) in one click. Stepping is index-based over the (sorted, filtered)
// options, so it honours any filter and gaps, and clamps at both ends. The chevrons fade in on
// hover/focus so the control is no bigger at rest than the plain field, and grey out when a step would
// run off the range. They are shown by default; pass showSteppers={false} to opt a field out.
function LedgerPeriodAutoComplete({
    label,
    periods = [],
    value,
    onChange,
    filter,
    required = false,
    disabled = false,
    disableClearable = false,
    showSteppers = true
}) {
    const options = utilities
        .sortEntityList(periods ?? [], 'periodNumber')
        .filter(period => (filter ? filter(period) : true));

    const autoComplete = (
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

    if (!showSteppers) {
        return autoComplete;
    }

    // Walk by whole positions in the sorted option list: +1 month = one period later, +1 year = 12.
    // A step must move by its full amount, so the (unclamped) target must land inside the option range -
    // otherwise a year action near an end would silently become a shorter move. Disabled at the bounds.
    const currentIndex = options.findIndex(p => p.periodNumber === value);
    const canStep = months =>
        !disabled &&
        currentIndex !== -1 &&
        currentIndex + months >= 0 &&
        currentIndex + months < options.length;
    const step = months => {
        if (canStep(months)) {
            onChange(options[currentIndex + months].periodNumber);
        }
    };

    const stepperSx = {
        p: '1px',
        '&:hover': { color: 'primary.main' }
    };

    const stepper = (tooltip, months, Icon, testId) => (
        <Tooltip title={tooltip} disableInteractive>
            {/* span keeps the tooltip working while the button is disabled */}
            <span>
                <IconButton
                    size="small"
                    tabIndex={-1}
                    aria-hidden
                    data-testid={testId}
                    disabled={!canStep(months)}
                    onClick={() => step(months)}
                    sx={stepperSx}
                >
                    <Icon sx={{ fontSize: '1.125rem' }} />
                </IconButton>
            </span>
        </Tooltip>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                // Faint at rest; the chevron cluster fades in when the user is near the field.
                '&:hover .ledger-steppers, &:focus-within .ledger-steppers': { opacity: 1 }
            }}
        >
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>{autoComplete}</Box>
            <Box
                className="ledger-steppers"
                // The AutoComplete sits its input ~29px below the top (block label + gap); drop the
                // chevrons by that much so they line up on the input row rather than near the label.
                sx={{ display: 'flex', mt: '36px', opacity: 0, transition: 'opacity 120ms' }}
            >
                {stepper(
                    'Previous year',
                    -12,
                    KeyboardDoubleArrowLeftIcon,
                    'ledger-step-prev-year'
                )}
                {stepper('Previous month', -1, KeyboardArrowLeftIcon, 'ledger-step-prev-month')}
                {stepper('Next month', 1, KeyboardArrowRightIcon, 'ledger-step-next-month')}
                {stepper('Next year', 12, KeyboardDoubleArrowRightIcon, 'ledger-step-next-year')}
            </Box>
        </Box>
    );
}

export default LedgerPeriodAutoComplete;
