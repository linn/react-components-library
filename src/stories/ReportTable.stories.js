/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MemoryRouter } from 'react-router';
import ReportTable from '../components/ReportTable';
import small from '../SampleData/ReportTable/small.json';
import big from '../SampleData/ReportTable/big.json';
import withExternalLinks from '../SampleData/ReportTable/withExternalLinks.json';
import providers from './renderUtils/Providers';

export default {
    title: 'Components/ReportTable',
    decorators: [
        story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>,
        story => providers(story)
    ],
    component: ReportTable
};

export const Default = args => <ReportTable {...args} />;

Default.story = {
    name: 'default'
};

Default.args = {
    showTitle: false,
    title: 'Your Report Title',
    showRowTitles: true,
    showTotals: false,
    hasExternalLinks: false,
    reportData: small
};

export const WhenBiggerReport = args => <ReportTable {...args} />;

WhenBiggerReport.story = {
    name: 'When Bigger Report'
};

WhenBiggerReport.args = {
    showTitle: false,
    title: 'Your Report Title',
    showRowTitles: true,
    showTotals: false,
    hasExternalLinks: false,
    reportData: big
};

export const WhenErrorMessage = args => <ReportTable {...args} />;

WhenErrorMessage.story = {
    showTitle: false,
    title: 'Your Report Title',
    showRowTitles: true,
    showTotals: false,
    hasExternalLinks: false,
    name: 'When Error Message'
};

WhenErrorMessage.args = {
    reportData: { message: 'Failed to fetch data' }
};

export const WhenExternalLinksInReport = args => <ReportTable {...args} />;

WhenExternalLinksInReport.story = {
    name: 'When External Links in Report'
};

WhenExternalLinksInReport.args = {
    showTitle: false,
    title: 'Your Report Title',
    showRowTitles: true,
    showTotals: false,
    reportData: withExternalLinks,
    hasExternalLinks: true
};
