/* eslint-disable react/jsx-props-no-spreading */

import { action } from '@storybook/addon-actions';

import CheckboxWithLabel from '../components/CheckboxWithLabel';

const actions = {
    onChange: action('onChange')
};

export default {
    title: 'Components/CheckboxWithLabel',
    decorators: [story => <div>{story()}</div>],
    component: CheckboxWithLabel
};

export const Default = args => <CheckboxWithLabel {...args} {...actions} />;

Default.story = {
    name: 'default '
};

Default.args = {
    checked: true,
    color: 'primary',
    label: 'Checkbox Label'
};
