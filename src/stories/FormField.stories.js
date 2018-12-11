import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import  FormField  from '../components/FormField';
 
let config = {
    label: "Label",
    disabled: false,
    type:"number",
    required:true
}

export const actions = {
    onChange: action('onChange'),
  };

storiesOf('FormField', module)
    .addDecorator(story => <div style={{ padding: '3rem', width: "60%" }}>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default  ', () => { return <FormField config={object('config', {...config})} propertyName="fieldProperty" {...actions} /> });
    