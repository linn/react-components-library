import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  ExportButton  from '../components/ExportButton';

export const actions = {
  onClick: action('Back'),

};

storiesOf('ExportButton', module)
  .addDecorator(story => <div>{story()}</div>)
  .add('default', () => <ExportButton {...actions} href="#" />);
