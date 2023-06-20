import React from 'react';
import { MemoryRouter } from 'react-router';
import Grid from '@mui/material/Grid';
import { action } from '@storybook/addon-actions';
import providers from './renderUtils/Providers';
import PrevNextButons from '../components/PrevNextButtons';
import Page from '../components/Page';
import PrevNextButonsDocs from './PrevNextButtonsDocs.mdx';

export default {
    title: 'Components/PrevNextButtons',
    decorators: [story => providers(story)],
    parameters: {
        docs: {
            page: PrevNextButonsDocs
        }
    },
    component: PrevNextButons
};

export const Default = args => (
    <MemoryRouter initialEntries={['/']}>
        <Page
            history={{
                location: {
                    pathname: '/a/test/path'
                }
            }}
        >
            <Grid container spacing={3}>
                <PrevNextButons {...args} />
            </Grid>
        </Page>
    </MemoryRouter>
);

Default.story = {
    name: 'default'
};

Default.args = {
    goPrev: action('goPrev'),
    goNext: action('goNext'),
    nextResult: 'NEXT',
    prevResult: 'PREV',
    disabled: false
};
