import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import SearchInputField from '../components/SearchInputField';

storiesOf('SearchInputField', module)
    .addDecorator(story => <div>{story()}</div>)
    .add('Label and value', () => (
        <SearchInputField
            value={text('value', 'Search')}
            label={text('label', 'Search Input Field')}
        />
    ))
    .add('Label and no value', () => (
        <SearchInputField value={text('value', '')} label={text('label', 'Search Input Field')} />
    ))
    .add('Error', () => (
        <SearchInputField
            value={text('value', 'Search')}
            label={text('label', 'Search Input Field')}
            error
        />
    ))
    .add('Disabled', () => (
        <SearchInputField
            value={text('value', 'Search')}
            label={text('label', 'Search Input Field')}
            disabled
        />
    ));
