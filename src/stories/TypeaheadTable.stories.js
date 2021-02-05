/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
    decorators: [story => <Page {...pageProps}>{story()}</Page>, story => providers(story)],
    component: TypeaheadTable
};

export const WithResults = args => <TypeaheadTable {...args} />;

export const Modal = args => <TypeaheadTable {...args} modal />;

WithResults.story = {
    name: 'with results'
};

WithResults.args = {
    table,
    columnNames,
    fetchItems: () => {},
    clearSearch: () => {},
    title: 'TypeaheadTable',
    history: { push: () => {} },
    placeholder: 'placeholder text',
    label: 'label',
    loading: false
};

export const NoResults = args => <TypeaheadTable {...args} />;

NoResults.story = {
    name: 'no results'
};

NoResults.args = {
    columnNames,
    fetchItems: () => {},
    clearSearch: () => {},
    title: 'TypeaheadTable',
    history: { push: () => {} },
    placeholder: 'placeholder text',
    label: 'label',
    table: {
        rows: [],
        totalItemCount: 0
    }
};

Modal.story = {
    name: 'modal'
};

Modal.args = {
    columnNames,
    fetchItems: () => {},
    clearSearch: () => {},
    title: 'TypeaheadTable',
    history: { push: () => {} },
    placeholder: 'placeholder text',
    label: 'label',
    table
};

export const Loading = args => <TypeaheadTable {...args} />;

Loading.story = {
    name: 'loading'
};

Loading.args = {
    table,
    columnNames,
    fetchItems: () => {},
    clearSearch: () => {},
    title: 'TypeaheadTable',
    history: { push: () => {} },
    placeholder: 'placeholder text',
    label: 'label',
    loading: true
};
