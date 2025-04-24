import React, { useState } from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import LinkField from '../components/LinkField';

export default {
    title: 'Components/LinkField',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: LinkField
};

export const LinkFieldExample = args => <LinkField {...args} />;

LinkFieldExample.story = {
    name: 'Standard link to match input field display'
};

LinkFieldExample.args = {
    value: 'Test Link',
    openLinksInNewTabs: false,
    to: '/',
    external: true,
    disabled: false,
    label: 'Test Link Example'
};
