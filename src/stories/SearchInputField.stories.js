import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
import linnTheme from '../themes/linnTheme';
import SearchInputField from '../components/SearchInputField';

export default {
    title: 'Components/SearchInputField',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: SearchInputField
};

export const Default = args => <SearchInputField {...args} />;

Default.story = {
    name: 'Label and value'
};

Default.args = {
    value: 'Search',
    label: 'Search Input Field'
};

export const LabelAndNoValue = args => <SearchInputField {...args} />;

LabelAndNoValue.story = {
    name: 'Label and no value'
};

LabelAndNoValue.args = {
    value: '',
    label: 'No Value'
};

export const ErrorStory = args => <SearchInputField {...args} />;

ErrorStory.story = {
    name: 'Error'
};

ErrorStory.args = {
    error: true,
    label: 'Error'
};

export const Disabled = args => <SearchInputField {...args} />;

Disabled.args = { label: 'Disabled', disabled: true };
