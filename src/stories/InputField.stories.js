import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Grid } from '@material-ui/core';
import InputField from '../components/InputField';
import moment from 'moment';

const actions = {
    onChange: action('onChange')
};

storiesOf('InputField', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('Label and value', () => (
        <InputField
            value={text('value', 'Value')}
            label={text('label', 'Input Field')}
            name={text('name', 'storybook')}
            {...actions}
        />
    ))
    .add('Label no value', () => (
        <InputField
            value={text('value', '')}
            label={text('label', 'No Value')}
            name={text('name', 'storybook')}
            {...actions}
        />
    ))
    .add('Full width', () => (
        <InputField
            value={text('value', 'Full Width')}
            label={text('label', 'Full Width')}
            name={text('name', 'storybook')}
            fullWidth
            {...actions}
        />
    ))
    .add('Error', () => (
        <InputField
            value={text('value', 'Error')}
            label={text('label', 'Error')}
            name={text('name', 'storybook')}
            error
            {...actions}
        />
    ))
    .add('Disabled', () => (
        <InputField
            value={text('value', 'Disabled')}
            label={text('label', 'Disabled')}
            name={text('name', 'storybook')}
            disabled
            {...actions}
        />
    ))
    .add('Date', () => (
        <InputField
            value={text('value', '2011-10-05T14:48:00.000Z')}
            label={text('label', 'Date')}
            name={text('name', 'storybook')}
            type="date"
            {...actions}
        />
    ))
    .add('Number', () => (
        <InputField
            value={text('value', '123.45')}
            label={text('label', 'Number')}
            name={text('name', 'storybook')}
            type="number"
            {...actions}
        />
    ))
    .add('With adornment', () => (
        <InputField
            value={text('value', 'With adornment')}
            label={text('label', 'With adornment')}
            name={text('name', 'storybook')}
            adornment="$"
            {...actions}
        />
    ))
    .add('Multiline', () => (
        <InputField
            value={text('value', 'Multiline')}
            label={text('label', 'Multiline')}
            name={text('name', 'storybook')}
            multiline
            {...actions}
        />
    ))
    .add('Regular spacing', () => (
        <Fragment>
            <div style={{ width: '50%' }}>
                <Grid container>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Normal Spacing')}
                            name={text('name', 'storybook')}
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Normal Spacing')}
                            name={text('name', 'storybook')}
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Normal Spacing')}
                            name={text('name', 'storybook')}
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Normal Spacing')}
                            name={text('name', 'storybook')}
                            {...actions}
                        />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    ))
    .add('Compact spacing', () => (
        <Fragment>
            <div style={{ width: '50%' }}>
                <Grid container>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Compact Spacing')}
                            name={text('name', 'storybook')}
                            margin="dense"
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Compact Spacing')}
                            name={text('name', 'storybook')}
                            margin="dense"
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Compact Spacing')}
                            name={text('name', 'storybook')}
                            margin="dense"
                            {...actions}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            value={text('value', 'value')}
                            label={text('label', 'Compact Spacing')}
                            name={text('name', 'storybook')}
                            margin="dense"
                            {...actions}
                        />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    ));
