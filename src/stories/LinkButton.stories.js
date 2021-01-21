/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import providers from './renderUtils/Providers';
import LinkButton from '../components/LinkButton';

export default {
    title: 'Components/LinkButton',
    decorators: [
        story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>,
        story => providers(story)
    ],
    component: LinkButton
};

export const Default = args => <LinkButton {...args} />;

Default.story = {
    name: 'default'
};

Default.args = {
    text: 'Some Link',
    to: '#'
};

export const External = args => <LinkButton {...args} />;

External.story = {
    name: 'external'
};

External.args = {
    external: true
};

export const DisabledWithTooltip = args => <LinkButton {...args} />;

DisabledWithTooltip.story = {
    name: 'disabled with tooltip'
};

DisabledWithTooltip.args = {
    disabled: true,
    tooltip: 'this button is disabled'
};
