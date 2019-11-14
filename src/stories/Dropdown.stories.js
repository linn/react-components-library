import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { linnTheme } from '../themes/linnTheme';

import Dropdown from '../components/Dropdown';

const actions = {
    onChange: action('onChange')
};

const items = ['Item One', 'Item Two', 'Item Three'];

storiesOf('Dropdown', module)
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .addDecorator(withKnobs)
    .add('default ', () => (
        <Dropdown
            value="Item One"
            label={text('label', 'Dropdown Label')}
            items={array('items', items)}
            propertyName="name"
            {...actions}
        />
    ));
