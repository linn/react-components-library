import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';
import Page from '../components/Page';
import Title from '../components/Title';
import providers from './renderUtils/Providers';

const props = {
    history: {
        push: () => {},
        location: {
            pathname: '/a/test/path'
        }
    }
};

const stories = storiesOf('Page', module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter())
.addDecorator(story => providers(story));

stories.add('default', () => (
    <Page history={object('location', props.history)}>
        <Title text="Page Content Here" />
    </Page>
));
