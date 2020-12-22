import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import TypeaheadTable from '../components/TypeaheadTable';
import Page from '../components/Page';
import providers from './renderUtils/Providers';

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/things'
        }
    }
};

const table = {
    rows: [],
    totalItemCount: 100
};

for (let i = 0; i < 100; i += 1) {
    const newItem = {
        id: `id${i}`,
        values: [
            { id: `0-${i}`, value: `0-${i}` },
            { id: `1-${i}`, value: `1-${i}` },
            { id: `2-${i}`, value: `2-${i}` },
            { id: `3-${i}`, value: `3-${i}` }
        ],
        links: [{ href: '#', rel: 'self' }]
    };
    table.rows.push(newItem);
}

const columnNames = ['0', '1', '2', '3'];

export default {
    title: 'Components/TypeaheadTable',

    decorators: [
        story => <Page {...pageProps}>{story()}</Page>,
        withKnobs,
        StoryRouter(),
        story => providers(story)
    ]
};

export const NoResults = () => (
    <TypeaheadTable
        columnNames={columnNames}
        fetchItems={() => {}}
        clearSearch={() => {}}
        title="TypeaheadTable"
        history={{ push: () => {} }}
        placeholder="placeholder text"
        label="label"
    />
);

NoResults.story = {
    name: 'no results'
};

export const Loading = () => (
    <TypeaheadTable
        table={table}
        columnNames={columnNames}
        fetchItems={() => {}}
        clearSearch={() => {}}
        loading
        title="TypeaheadTable"
        history={{ push: () => {} }}
        placeholder="placeholder text"
        label="label"
    />
);

Loading.story = {
    name: 'loading'
};

export const WithResults = () => (
    <TypeaheadTable
        table={table}
        columnNames={columnNames}
        fetchItems={() => {}}
        clearSearch={() => {}}
        title="TypeaheadTable"
        history={{ push: () => {} }}
        placeholder="placeholder text"
        label="label"
    />
);

WithResults.story = {
    name: 'with results'
};
