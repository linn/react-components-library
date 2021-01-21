import React from 'react';
import { MemoryRouter } from 'react-router';
import providers from './renderUtils/Providers';
import LinkButton from '../components/LinkButton';

export default {
    title: 'Components/LinkButton',
    decorators: [story => providers(story)],
    component: LinkButton
};

export const Default = () => (
    <MemoryRouter initialEntries={['/']}>
        <LinkButton text="Some Link" to="#" />
    </MemoryRouter>
);

Default.story = {
    name: 'default'
};

export const External = () => <LinkButton text="Some Link" to="#" external />;

External.story = {
    name: 'external'
};

export const DisabledWithTooltip = () => (
    <LinkButton text="Some Link" to="#" disabled tooltip="this button is disabled" />
);

DisabledWithTooltip.story = {
    name: 'disabled with tooltip'
};
