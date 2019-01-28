import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Grid } from '@material-ui/core';
import InputField from '../components/InputField';

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
            {...actions}
        />
    ))
    .add('Label no value', () => (
        <InputField value={text('value', '')} label={text('label', 'No Value')} {...actions} />
    ))
    .add('Full width', () => (
        <InputField
            value={text('value', 'Full Width')}
            label={text('label', 'Full Width')}
            fullWidth
            {...actions}
        />
    ))
    .add('Error', () => (
        <InputField
            value={text('value', 'Error')}
            label={text('label', 'Error')}
            error
            {...actions}
        />
    ))
    .add('Disabled', () => (
        <InputField
            value={text('value', 'Disabled')}
            label={text('label', 'Disabled')}
            disabled
            {...actions}
        />
    ))
    .add('Date', () => (
        <InputField
            value={text('value', '2011-10-05T14:48:00.000Z')}
            label={text('label', 'Date')}
            type="date"
            {...actions}
        />
    ))
    .add('Number', () => (
        <InputField
            value={text('value', '123.45')}
            label={text('label', 'Number')}
            type="number"
            {...actions}
        />
    ))
    .add('With adornment', () => (
        <InputField
            value={text('value', 'With adornment')}
            label={text('label', 'With adornment')}
            adornment="$"
            {...actions}
        />
    ))
    .add('Multiline', () => (
        <InputField
            value={text('value', 'Multiline')}
            label={text('label', 'Multiline')}
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
    ))
    .add('Compact spacing', () => (
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
    ));
