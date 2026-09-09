import { action } from 'storybook/actions';
import Panel from './Panel';

const sampleSection = {
    id: 'purchasing',
    columns: [
        {
            categories: [
                {
                    title: 'Purchase Orders',
                    items: [
                        { title: 'Create PO', href: '/purchasing/orders/create', showInMenu: true },
                        { title: 'View POs', href: '/purchasing/orders', showInMenu: true },
                        {
                            title: 'Approve POs',
                            href: '/purchasing/orders/approve',
                            showInMenu: true
                        }
                    ]
                },
                {
                    title: 'Suppliers',
                    items: [
                        { title: 'Supplier List', href: '/purchasing/suppliers', showInMenu: true },
                        {
                            title: 'Add Supplier',
                            href: '/purchasing/suppliers/create',
                            showInMenu: true
                        }
                    ]
                }
            ]
        },
        {
            categories: [
                {
                    title: 'Invoices',
                    items: [
                        { title: 'Invoice List', href: '/purchasing/invoices', showInMenu: true },
                        {
                            title: 'Overdue Invoices',
                            href: '/purchasing/invoices/overdue',
                            showInMenu: true
                        }
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
        close: action('close'),
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
