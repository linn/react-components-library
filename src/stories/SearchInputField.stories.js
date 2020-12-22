import React from 'react';
import { text } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import SearchInputField from '../components/SearchInputField';

export default {
    title: 'Components/SearchInputField',

    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ]
};

export const LabelAndValue = () => (
    <SearchInputField value={text('value', 'Search')} label={text('label', 'Search Input Field')} />
);

LabelAndValue.story = {
    name: 'Label and value'
};

export const LabelAndNoValue = () => (
    <SearchInputField value={text('value', '')} label={text('label', 'Search Input Field')} />
);

LabelAndNoValue.story = {
    name: 'Label and no value'
};

export const Error = () => (
    <SearchInputField
        value={text('value', 'Search')}
        label={text('label', 'Search Input Field')}
        error
    />
);

export const Disabled = () => (
    <SearchInputField
        value={text('value', 'Search')}
        label={text('label', 'Search Input Field')}
        disabled
    />
);
