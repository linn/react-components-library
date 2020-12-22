import React from 'react';
import StoryRouter from 'storybook-react-router';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import ReportTable from '../components/ReportTable';
import Page from '../components/Page';
import small from '../SampleData/ReportTable/small';
import big from '../SampleData/ReportTable/big';
import withExternalLinks from '../SampleData/ReportTable/withExternalLinks';
import providers from './renderUtils/Providers';

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
    hasExternalLinks: boolean('showTotals', false)
};

export default {
    title: 'ReportTable',
    decorators: [
        story => <Page {...pageProps}>{story()}</Page>,
        withKnobs,
        StoryRouter(),
        story => providers(story)
    ]
};

export const WithKnobs = () => (
    <ReportTable
        showTitle={boolean('showTitle', false)}
        title={text('title', 'Your Report Title')}
        showRowTitles={boolean('showRowTitles', true)}
        showTotals={boolean('showTotals', false)}
        hasExternalLinks={boolean('hasExternalLinks', false)}
        reportData={small}
    />
);

export const WhenBiggerReport = () => <ReportTable {...defaultProps} reportData={big} />;
export const WhenNoData = () => <ReportTable {...defaultProps} />;

WhenNoData.story = {
    name: 'When No data'
};

export const WhenErrorMessage = () => (
    <ReportTable {...defaultProps} reportData={{ message: 'Failed to fetch data' }} />
);

export const WhenExternalLinksInReport = () => (
    <ReportTable {...defaultProps} reportData={withExternalLinks} hasExternalLinks />
);

WhenExternalLinksInReport.story = {
    name: 'When External Links in Report'
};
