import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import MenuPage from '../components/MenuPage';
import Page from '../components/Page';

const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/section'
        }
    }
};

storiesOf('MenuPage', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .addDecorator(story => <Page {...pageProps}>{story()}</Page>)
    .addDecorator(StoryRouter())
    .add('default', () => (
        <MenuPage
            id={select(
                'id',
                {
                    sales: 'sales',
                    production: 'production',
                    logistics: 'logistics',
                    service: 'service',
                    purchasing: 'purchasing',
                    finance: 'finance',
                    marketing: 'marketing',
                    records: 'records',
                    randd: 'r-and-d',
                    it: 'it',
                    hr: 'hr',
                    info: 'info'
                },
                'sales'
            )}
        />
    ));
