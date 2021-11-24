/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';

import Dropdown from '../components/Dropdown';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'Components/Dropdown',
    decorators: [
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                    <div>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: Dropdown
};

export const Default = args => <Dropdown {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    value: 'Item One',
    label: 'Dropdown Label',
    items: ['Item One', 'Item Two', 'Item Three'],
    propertyName: 'name'
};
