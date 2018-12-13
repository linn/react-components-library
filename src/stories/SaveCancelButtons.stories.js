import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import  SaveCancelButtons  from '../components/SaveCancelButtons';

export const actions = {
  saveClick: action('Saved'),
  cancelClick: action('Cancelled'),
};


storiesOf('SaveCancelButtons', module)
  .addDecorator(story => <div style={{ position: "absolute", right: '5%', top: '10%'  }}>{story()}</div>)
  .add('default', () => <SaveCancelButtons {...actions} />);
