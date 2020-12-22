import React, { Fragment } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
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
        ),
        withKnobs
    ]
};

export const LabelAndValue = () => (
    <InputField value={text('value', 'Value')} label={text('label', 'Input Field')} {...actions} />
);

LabelAndValue.story = {
    name: 'Label and value'
};

export const LabelNoValue = () => (
    <InputField value={text('value', '')} label={text('label', 'No Value')} {...actions} />
);

LabelNoValue.story = {
    name: 'Label no value'
};

export const FullWidth = () => (
    <InputField
        value={text('value', 'Full Width')}
        label={text('label', 'Full Width')}
        fullWidth
        {...actions}
    />
);

FullWidth.story = {
    name: 'Full width'
};

export const Error = () => (
    <InputField value={text('value', 'Error')} label={text('label', 'Error')} error {...actions} />
);

export const Disabled = () => (
    <InputField value={text('value', 'Disabled')} label={text('label', 'Disabled')} disabled />
);

export const Date = () => (
    <InputField
        value={text('value', '2011-10-05T14:48:00.000Z')}
        label={text('label', 'Date')}
        type="date"
        {...actions}
    />
);

export const Number = () => (
    <InputField
        value={text('value', '123.45')}
        label={text('label', 'Number')}
        type="number"
        {...actions}
    />
);

export const WithAdornment = () => (
    <InputField
        value={text('value', 'With adornment')}
        label={text('label', 'With adornment')}
        adornment="$"
        {...actions}
    />
);

WithAdornment.story = {
    name: 'With adornment'
};

export const MaxLength = () => (
    <InputField
        value={text('value', 'A')}
        label={text('label', 'Max Length')}
        maxLength={1}
        {...actions}
    />
);

MaxLength.story = {
    name: 'Max length'
};

export const Multiline = () => (
    <InputField
        value={text('value', 'Multiline')}
        label={text('label', 'Multiline')}
        multiline
        {...actions}
    />
);

export const RegularSpacing = () => (
    <Fragment>
        <div style={{ width: '50%' }}>
            <Grid container>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Normal Spacing')}
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Normal Spacing')}
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Normal Spacing')}
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Normal Spacing')}
                        {...actions}
                    />
                </Grid>
            </Grid>
        </div>
    </Fragment>
);

RegularSpacing.story = {
    name: 'Regular spacing'
};

export const CompactSpacing = () => (
    <Fragment>
        <div style={{ width: '50%' }}>
            <Grid container>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Compact Spacing')}
                        margin="dense"
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Compact Spacing')}
                        margin="dense"
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Compact Spacing')}
                        margin="dense"
                        {...actions}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputField
                        value={text('value', 'value')}
                        label={text('label', 'Compact Spacing')}
                        margin="dense"
                        {...actions}
                    />
                </Grid>
            </Grid>
        </div>
    </Fragment>
);

CompactSpacing.story = {
    name: 'Compact spacing'
};
