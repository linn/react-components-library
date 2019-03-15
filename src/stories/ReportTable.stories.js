import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { withKnobs } from '@storybook/addon-knobs/react';
import { boolean, text, array } from '@storybook/addon-knobs';
import ReportTable from '../components/ReportTable';
import Page from '../components/Page';
import small from '../SampleData/ReportTable/small';
import big from '../SampleData/ReportTable/big';
import withExternalLinks from '../SampleData/ReportTable/withExternalLinks';

const appRoutes = ['/products/maint', '/products/reports'];
const pageProps = {
    history: {
        push: () => {},
        location: {
            pathname: '/data'
        }
    }
};

const defaultProps = {
    showTitle: boolean('showTitle', false),
    title: text('title', 'Your Report Title'),
    showRowTitles: boolean('showRowTitles', true),
    showTotals: boolean('showTotals', false),
    appRoutes: array('appRoutes', appRoutes)
};

const stories = storiesOf('ReportTable', module);
stories.addDecorator(story => <Page {...pageProps}>{story()}</Page>);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories.add('With Knobs', () => (
    <ReportTable
        showTitle={boolean('showTitle', false)}
        title={text('title', 'Your Report Title')}
        showRowTitles={boolean('showRowTitles', true)}
        showTotals={boolean('showTotals', false)}
        appRoutes={array('appRoutes', appRoutes)}
        reportData={small}
    />
));

stories.add('When Bigger Report', () => <ReportTable {...defaultProps} reportData={big} />);

stories.add('When No data', () => <ReportTable {...defaultProps} />);

stories.add('When Error Message', () => (
    <ReportTable {...defaultProps} reportData={{ message: 'Failed to fetch data' }} />
));

stories.add('When External Links in Report', () => (
    <ReportTable {...defaultProps} reportData={withExternalLinks} />
));
