import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
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

storiesOf('Typeahead', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>)
        </ThemeProvider>
    ))
    .addDecorator(withKnobs)

    .add('default ', () => (
        <Typeahead
            title={text('title', 'Title Text')}
            loading={boolean('loading', false)}
            fetchItems={fetchItems}
            items={array('items', items)}
            clearSearch={clearSearch}
            classes={{}}
        />
    ))
    .add('nothingFound ', () => (
        <Typeahead
            title={text('title', 'Title Text')}
            loading={boolean('loading', false)}
            fetchItems={fetchItems}
            items={array('items', [])}
            clearSearch={clearSearch}
            classes={{}}
        />
    ))
    .add('loading ', () => (
        <Typeahead
            title={text('title', 'Title Text')}
            loading={boolean('loading', true)}
            fetchItems={fetchItems}
            items={array('items', [])}
            clearSearch={clearSearch}
            classes={{}}
        />
    ));
