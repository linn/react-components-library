import ExportButton from './ExportButton';

export default {
    title: 'Components/ExportButton',
    component: ExportButton,
    tags: ['autodocs'],
    args: {
        href: '/api/export',
        fileName: 'report.csv',
        buttonText: 'EXPORT',
        tooltipText: 'Download report as CSV file',
        disabled: false,
        accept: 'text/csv'
    }
};

export const Default = {};

export const Disabled = {
    args: {
        disabled: true
    }
};

export const CustomLabel = {
    name: 'Custom label',
    args: {
        buttonText: 'DOWNLOAD',
        tooltipText: 'Download data as CSV',
        fileName: 'data.csv'
    }
};
