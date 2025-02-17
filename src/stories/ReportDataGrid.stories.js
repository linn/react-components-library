/* eslint-disable react/jsx-props-no-spreading */

import { MemoryRouter } from 'react-router';
import ReportDataGrid from '../components/ReportDataGrid';
import small from '../SampleData/ReportTable/small.json';
import providers from './renderUtils/Providers';

export default {
    title: 'Components/ReportDataGrid',
    decorators: [
        story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>,
        story => providers(story)
    ],
    component: ReportDataGrid
};

export function Default(args) {
    return <ReportDataGrid {...args} />;
}

Default.story = {
    name: 'default'
};

Default.args = {
    showTitle: false,
    title: 'Your Report Title',
    showRowTitles: true,
    showTotals: false,
    hasExternalLinks: false,
    report: small
};
