import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Dropdown from '../components/Dropdown';

const actions = {
    onChange: action('onChange')
};

const items = ['Item One', 'Item Two', 'Item Three'];

storiesOf('Dropdown', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <Dropdown
            value={text('value', '')}
            label={text('label', 'Dropdown Label')}
            items={array('items', items)}
            {...actions}
        />
    ));
