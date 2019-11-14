import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs';
import Breadcrumbs from '../components/Breadcrumbs';

const props = {
    history: {
        push: () => {},
        location: {
            pathname: '/a/test/path'
        }
    }
};

const stories = storiesOf('Breadcrumbs', module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories.add('default', () => (
    <Breadcrumbs {...props} history={object('location', props.history)} />
));
