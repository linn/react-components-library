import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';

import  Breadcrumbs from '../components/Breadcrumbs';

export const actions = {
};

const props = {
  location: {
       pathname: '/a/test/path',
     },
     history : {
       push: () => {alert('hi')}
     }

}

storiesOf('Breadcrumbs', module)
.addDecorator(StoryRouter())
.add('Breadcrumbs', () => (
  <Breadcrumbs {...props}/>
));
