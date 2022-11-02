import React from 'react';
import { MemoryRouter } from 'react-router';
import providers from './renderUtils/Providers';
import LinkButton from '../components/LinkButton';

export default {
    title: 'Components/LinkButton',
    decorators: [story => providers(story)],
    component: LinkButton
};

export const Default = args => (
    <MemoryRouter initialEntries={['/']}>
        <LinkButton {...args} />
    </MemoryRouter>
);

Default.story = {
    name: 'default'
};

Default.args = {
    text: 'Some Link'
};

export const External = args => <LinkButton {...args} />;

External.story = {
    name: 'external'
};

External.args = {
    external: true,
    text: 'Some Link',
    to: '#'
};

export const ExternalNewTab = args => <LinkButton {...args} />;

ExternalNewTab.story = {
    name: 'external new tab'
};

ExternalNewTab.args = {
    external: true,
    text: 'Some Link',
    to: '#',
    newTab: true
};

export const DisabledWithTooltip = args => <LinkButton {...args} />;

DisabledWithTooltip.story = {
    name: 'disabled with tooltip'
};

DisabledWithTooltip.args = {
    text: 'Some Link',
    disabled: true,
    tooltip: 'this button is disabled'
};
