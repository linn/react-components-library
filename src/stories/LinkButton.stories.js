import React from 'react';
import StoryRouter from 'storybook-react-router';
import Grid from '@material-ui/core/Grid';
import providers from './renderUtils/Providers';
import LinkButton from '../components/LinkButton';

// const stories = storiesOf('LinkButton', module);

// stories.addDecorator(StoryRouter()).addDecorator(story => providers(story));
export default {
    title: 'LinkButton',
    decorators: [StoryRouter(), story => providers(story)]
};

export const Default = () => <LinkButton text="Some Link" to="#" />;

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
