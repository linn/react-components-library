import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import AutoComplete from '../components/AutoComplete';

const actions = {
    onChange: action('onChange')
};

const suggestions = ['Item One', 'Item Two', 'Item Three'].map(value => ({ label: value }));

storiesOf('AutoComplete', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default ', () => (
        <AutoComplete
            label={text('label', 'AutoComplete Label')}
            suggestions={array('suggestions', suggestions)}
            {...actions}
        />
    ));
