import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import results from '../../jest-test-results.json';
import { withTests } from '@storybook/addon-jest';

import  BackButton  from '../components/BackButton';

export const actions = {
  backClick: action('Back'),

};

console.log(results);

storiesOf('BackButton', module)
  .addDecorator(story => <div style={{ position: "absolute", left: '5%', top: '10%'  }}>{story()}</div>)
  .addDecorator(withTests({ results}))
  .add('default', () => <BackButton {...actions} />)
  .add(
    'Tests',
    () => <div>Jest results in storybook</div>,
    {
      jest: ['BackButton.test.js'],
    }
  );
