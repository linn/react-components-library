import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import  Navbar  from '../components/Navbar';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { boolean, text } from '@storybook/addon-knobs';


  

const stories = storiesOf('Navigation', module);
stories.addDecorator(StoryRouter());

stories.add('default', () => (
  <Navbar  />
));
