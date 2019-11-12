import React from 'react';
import { storiesOf } from '@storybook/react';
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

const removeItem = () => {};

storiesOf('SelectedItemsList', module)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
        </ThemeProvider>
    ))
    .add('default ', () => (
        <SelectedItemsList title="String Entities" items={entityStrings} removeItem={removeItem} />
    ))
    .add('with objects', () => (
        <SelectedItemsList title="Object Entities" items={entities} removeItem={removeItem} />
    ));
