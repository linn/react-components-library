import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import  BackButton  from '../components/BackButton';

export const actions = {
  backClick: action('Back'),

};


storiesOf('BackButton', module)
  .addDecorator(story => <div style={{ position: "absolute", left: '5%', top: '10%'  }}>{story()}</div>)
  .add('default', () => <BackButton {...actions} />);
