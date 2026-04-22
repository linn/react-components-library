import { fn } from 'storybook/test';
import SearchPanel from './SearchPanel';

const sampleMenu = [
    {
        id: 'purchasing',
        title: 'Purchasing',
        columns: [
            {
                categories: [
                    {
                        title: 'Purchase Orders',
                        items: [
                            { title: 'Create PO', href: '/purchasing/orders/create' },
                            { title: 'View POs', href: '/purchasing/orders' }
                        ]
                    },
                    {
                        title: 'Suppliers',
                        items: [
                            { title: 'Supplier List', href: '/purchasing/suppliers' },
                            { title: 'Add Supplier', href: '/purchasing/suppliers/create' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'sales',
        title: 'Sales',
        columns: [
            {
                categories: [
                    {
                        title: 'Orders',
                        items: [
                            { title: 'Sales Orders', href: '/sales/orders' },
                            { title: 'Invoices', href: '/sales/invoices' }
                        ]
                    }
                ]
            }
        ]
    }
];

export default {
    title: 'Components/SearchPanel',
    component: SearchPanel,
    tags: ['autodocs'],
    args: {
        close: fn(),
        menu: sampleMenu
    }
};

export const Default = {};
