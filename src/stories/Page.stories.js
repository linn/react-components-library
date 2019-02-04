import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import Page from '../components/Page';
import Title from '../components/Title';

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
stories.addDecorator(StoryRouter());

stories.add('default', () => (
    <Page history={object('location', props.history)}>
        <Title text="Page Content Here" />
    </Page>
));
