/* eslint-disable react/jsx-props-no-spreading */

import { action } from '@storybook/addon-actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Dropdown from '../components/Dropdown';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'Components/Dropdown',
    decorators: [
        story => (
            <ThemeProvider theme={createTheme()}>
                <div>{story()}</div>
            </ThemeProvider>
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
