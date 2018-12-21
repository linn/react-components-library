import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CheckboxWithLabel from '../components/CheckboxWithLabel';

const actions = {
    onChange: action('onChange')
}

storiesOf('CheckboxWithLabel', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <CheckboxWithLabel 
            checked={boolean('checked', true)} 
            color={text('color', 'primary')}
            label={text('label', 'Checkbox Label')}
            {...actions}
        />
    ));