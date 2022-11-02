import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '@mui/material/Grid';
import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import InputField from '../components/InputField';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'Components/InputField',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: InputField
};

export const LabelAndValue = args => <InputField {...args} {...actions} />;

LabelAndValue.story = {
    name: 'Label and value'
};

LabelAndValue.args = {
    value: 'Value',
    label: 'Input Field'
};

export const LabelNoValue = args => <InputField {...args} {...actions} />;

LabelNoValue.story = {
    name: 'Label no value'
};

LabelNoValue.args = {
    value: '',
    label: 'No Value'
};

export const FullWidth = args => <InputField {...args} {...actions} />;

FullWidth.story = {
    name: 'Full width'
};

FullWidth.args = {
    value: 'Full Width',
    label: 'Full Width',
    fullWidth: true
};

export const WithError = args => <InputField {...args} {...actions} />;

WithError.args = {
    text: 'Error',
    label: 'Error',
    error: true
};

export const Disabled = args => <InputField {...args} disabled />;

Disabled.args = {
    value: 'Disabled',
    label: 'Disabled',
    disabled: true
};

export const DateInput = args => <InputField {...args} {...actions} />;

DateInput.args = {
    value: '2011-10-05T14:48:00.000Z',
    label: 'Date',
    type: 'date'
};

export const NumberInput = args => <InputField {...args} {...actions} />;

NumberInput.args = {
    value: '123.45',
    label: 'Number',
    type: 'number'
};

export const WithAdornment = args => <InputField {...args} {...actions} />;

WithAdornment.story = {
    name: 'With adornment'
};

WithAdornment.args = {
    value: 'With adornment',
    label: 'With adornment',
    adornment: '$'
};

export const MaxLength = args => {
    const [value, setValue] = useState('v');
    const handleChange = newValue => {
        setValue(newValue);
    };
    return (
        <InputField
            {...args}
            {...actions}
            value={value}
            onChange={(_, newVal) => handleChange(newVal)}
        />
    );
};

MaxLength.story = {
    name: 'Max length'
};

MaxLength.args = {
    label: 'Max Length',
    maxLength: 10
};

export const Multiline = args => <InputField {...args} {...actions} />;

Multiline.args = {
    value: 'Multiline',
    label: 'Multiline',
    multiline: true
};

export const RegularSpacing = args => (
    <div style={{ width: '50%' }}>
        <Grid container>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
        </Grid>
    </div>
);

RegularSpacing.story = {
    name: 'Regular spacing'
};

RegularSpacing.args = {
    value: 'value',
    label: 'Normal Spacing'
};

export const CompactSpacing = args => (
    <div style={{ width: '50%' }}>
        <Grid container>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
            <Grid item xs={6}>
                <InputField {...args} {...actions} />
            </Grid>
        </Grid>
    </div>
);

CompactSpacing.story = {
    name: 'Compact spacing'
};

CompactSpacing.args = {
    value: 'value',
    label: 'Compact Spacing',
    margin: 'dense'
};
