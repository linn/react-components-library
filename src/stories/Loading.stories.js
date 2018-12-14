import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Loading  from '../components/Loading';


storiesOf('Loading', module)
  .addDecorator(story => <div>{story()}</div>)
  .add('default', () => <Loading/>);