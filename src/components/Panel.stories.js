import { fn } from 'storybook/test';
import Panel from './Panel';

const sampleSection = {
    id: 'purchasing',
    columns: [
        {
            categories: [
                {
                    title: 'Purchase Orders',
                    items: [
                        { title: 'Create PO', href: '#', showInMenu: true },
                        { title: 'View POs', href: '#', showInMenu: true },
                        { title: 'Approve POs', href: '#', showInMenu: true }
                    ]
                },
                {
                    title: 'Suppliers',
                    items: [
                        { title: 'Supplier List', href: '#', showInMenu: true },
                        { title: 'Add Supplier', href: '#', showInMenu: true }
                    ]
                }
            ]
        },
        {
            categories: [
                {
                    title: 'Invoices',
                    items: [
                        { title: 'Invoice List', href: '#', showInMenu: true },
                        { title: 'Overdue Invoices', href: '#', showInMenu: true }
                    ]
                }
            ]
        }
    ]
};

export default {
    title: 'Components/Panel',
    component: Panel,
    tags: ['autodocs'],
    args: {
        close: fn(),
        section: sampleSection
    }
};

export const Default = {};

export const SingleColumn = {
    name: 'Single column',
    args: {
        section: {
            ...sampleSection,
            columns: [sampleSection.columns[0]]
        }
    }
};
