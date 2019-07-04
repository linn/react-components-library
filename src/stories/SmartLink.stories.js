import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import StoryRouter from 'storybook-react-router';
import { array, text } from '@storybook/addon-knobs';
import Typography from '@material-ui/core/Typography';
import SmartLink from '../components/SmartLink';
import Page from '../components/Page';

const appRoutes = ['/products/maint', '/products/reports'];

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/list'
        }
    }
};

// The component to turn into a link
const Component = () => (
    <Typography color="primary" variant="subtitle2">
        link
    </Typography>
);

// Wrap it up
const LinkedComponent = SmartLink(Component);

storiesOf('SmartLink', module)
    .addDecorator(story => <Page {...pageProps}>{story()}</Page>)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .add('default', () => (
        <LinkedComponent
            appRoutes={array('appRoutes', appRoutes)}
            to={text('to', '/products/maint/sa-core-types')}
        />
    ));
