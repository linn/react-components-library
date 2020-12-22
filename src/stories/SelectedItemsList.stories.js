import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import SelectedItemsList from '../components/SelectedItemsList';

const entities = [
    { id: '1', displayText: 'First Object' },
    { id: '2', displayText: 'Second Object' }
];

const entityStrings = ['First String', 'Second String'];

const entitiesLong = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q'
];

const removeItem = () => {};

export default {
    title: 'Components/SelectedItemsList',

    decorators: [
        withKnobs,
        StoryRouter(),
        story => (
            <ThemeProvider theme={linnTheme}>
                <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
            </ThemeProvider>
        )
    ]
};

export const Default = () => (
    <SelectedItemsList title="String Entities" items={entityStrings} removeItem={removeItem} />
);

Default.story = {
    name: 'default '
};

export const WithObjects = () => (
    <SelectedItemsList title="Object Entities" items={entities} removeItem={removeItem} />
);

WithObjects.story = {
    name: 'with objects'
};

export const ManyObjectsNoScrolling = () => (
    <SelectedItemsList title="Object Entities" items={entitiesLong} removeItem={removeItem} />
);

ManyObjectsNoScrolling.story = {
    name: 'many objects no scrolling'
};

export const ManyObjectsWithScrolling = () => (
    <SelectedItemsList
        title="Object Entities"
        items={entitiesLong}
        removeItem={removeItem}
        maxHeight={300}
    />
);

ManyObjectsWithScrolling.story = {
    name: 'many objects with scrolling'
};
