import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import Typeahead from '../components/Typeahead';

const items = [
    { id: '1', name: 'Item 1', href: '/1', description: 'Description of item 1' },
    { id: '2', name: 'Item 2', href: '/2', description: 'Description of item 2' },
    { id: '3', name: 'Item 3', href: '/3', description: 'Description of item 3' }
];

const fetchItems = () => {};

const clearSearch = () => {};

export default {
    title: 'Components/Typeahead',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <ThemeProvider theme={linnTheme}>
                    <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
                </ThemeProvider>
            </MemoryRouter>
        ),
        withKnobs
    ],
    component: Typeahead
};

export const Default = () => (
    <Typeahead
        title={text('title', 'Title Text')}
        loading={boolean('loading', false)}
        fetchItems={fetchItems}
        items={array('items', items)}
        clearSearch={clearSearch}
        classes={{}}
    />
);

Default.story = {
    name: 'default '
};

export const NothingFound = () => (
    <Typeahead
        title={text('title', 'Title Text')}
        loading={boolean('loading', false)}
        fetchItems={fetchItems}
        items={array('items', [])}
        clearSearch={clearSearch}
        classes={{}}
    />
);

NothingFound.story = {
    name: 'nothingFound '
};

export const Loading = () => (
    <Typeahead
        title={text('title', 'Title Text')}
        loading={boolean('loading', true)}
        fetchItems={fetchItems}
        items={array('items', [])}
        clearSearch={clearSearch}
        classes={{}}
    />
);

Loading.story = {
    name: 'loading '
};

export const Modal = () => (
    <Typeahead
        title={text('title', 'Title Text')}
        loading={boolean('loading', false)}
        modal
        label="click me and see"
        fetchItems={fetchItems}
        items={array('items', [])}
        clearSearch={clearSearch}
        classes={{}}
    />
);

Modal.story = {
    name: 'modal '
};
