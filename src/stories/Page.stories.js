/* eslint-disable react/jsx-props-no-spreading */

import Page from '../components/Page';
import providers from './renderUtils/Providers';
import { Typography } from '@mui/material';

export default {
    title: 'Components/Page',
    decorators: [story => providers(story)],
    component: Page
};

export const Default = args => (
    <Page {...args}>
        <Typography variant="h4">Page Content Here</Typography>
    </Page>
);

Default.story = {
    name: 'default'
};

Default.args = {
    location: {
        pathname: '/a/test/path'
    },
    navigate: () => {}
};
