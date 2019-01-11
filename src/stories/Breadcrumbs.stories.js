import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import  Breadcrumbs from '../components/Breadcrumbs';

export const actions = {
};

const props = {
  location: {
       pathname: '/a/test/path/',
     },
     history : {
       push: () => {alert('hi')}
     }

}
const stories = storiesOf('Breadcrumbs', module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories
.add('default', () => (
  <Breadcrumbs {...props} location={object('location', props.location)}/>
));
