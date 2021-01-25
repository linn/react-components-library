/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
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
        story => (
            <ThemeProvider theme={linnTheme}>
                <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
            </ThemeProvider>
        )
    ],
    component: SelectedItemsList
};

export const Default = args => <SelectedItemsList {...args} />;

Default.story = {
    name: 'default '
};

Default.args = {
    title: 'String Entities',
    items: entityStrings,
    removeItem
};

export const WithObjects = args => <SelectedItemsList {...args} />;

WithObjects.story = {
    name: 'with objects'
};

WithObjects.args = {
    title: 'Object Entities',
    items: entities,
    removeItem
};

export const ManyObjectsNoScrolling = args => <SelectedItemsList {...args} />;

ManyObjectsNoScrolling.story = {
    name: 'many objects no scrolling'
};

ManyObjectsNoScrolling.args = {
    title: 'Object Entities',
    items: entitiesLong,
    removeItem
};

export const ManyObjectsWithScrolling = args => <SelectedItemsList {...args} />;

ManyObjectsWithScrolling.story = {
    name: 'many objects with scrolling'
};

ManyObjectsWithScrolling.args = {
    title: 'Object Entities',
    items: entitiesLong,
    removeItem,
    maxHeight: 300
};
