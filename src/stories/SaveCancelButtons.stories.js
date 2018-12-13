import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import results from '../../jest-test-results.json';
import { withTests } from '@storybook/addon-jest';


import  SaveCancelButtons  from '../components/SaveCancelButtons';

export const actions = {
  saveClick: action('Saved'),
  cancelClick: action('Cancelled'),
};


storiesOf('SaveCancelButtons', module)
  .addDecorator(story => <div style={{ position: "absolute", right: '5%', top: '10%'  }}>{story()}</div>)
  .addDecorator(withTests({ results}))
  .add('default', () => <SaveCancelButtons {...actions} />)
  .add(
    'Tests',
    () => <div>Jest results in storybook</div>,
    {
      jest: ['SaveCancelButtons.test.js'],
    }
  );
