import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { action } from '@storybook/addon-actions';
import providers from './renderUtils/Providers';
import ConfirmDialogDocs from './ConfirmDialogDocs.mdx';
import ConfirmDialog from '../components/ConfirmDialog';

export default {
    title: 'Components/ConfirmDialog',
    decorators: [story => providers(story)],
    parameters: {
        docs: {
            page: ConfirmDialogDocs
        }
    },
    component: ConfirmDialog
};

export function Default(args) {
    const [open, setOpen] = useState(false);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Do Something
                </Button>
                <ConfirmDialog {...args} visible={open} closeDialog={() => setOpen(false)} />
            </Grid>
        </Grid>
    );
}

Default.story = {
    name: 'default'
};

Default.args = {
    primaryText: 'Are you sure you are sure?',
    secondaryText: 'Are you sure you are sure you are sure?',
    onConfirm: action('onConfirm'),
    onCancel: action('onCancel')
};
