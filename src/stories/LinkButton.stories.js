import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import Grid from '@material-ui/core/Grid';
import providers from './renderUtils/Providers';
import LinkButton from '../components/LinkButton';

const stories = storiesOf('LinkButton', module);

stories.addDecorator(StoryRouter()).addDecorator(story => providers(story));
stories
    .addDecorator(story => (
        <Grid container spacing={3}>
            <Grid item xs={2}>
                {story()}
            </Grid>
        </Grid>
    ))
    .add('default', () => <LinkButton text="Some Link" to="#" />)
    .add('external', () => <LinkButton text="Some Link" to="#" external />)
    .add('disabled with tooltip', () => (
        <LinkButton text="Some Link" to="#" disabled tooltip="this button is disabled" />
    ));
