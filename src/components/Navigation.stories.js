import { action } from 'storybook/actions';
import Navigation from './Navigation';

const sampleSections = [
    {
        id: 'purchasing',
        title: 'Purchasing',
        columns: [
            {
                categories: [
                    {
                        title: 'Purchase Orders',
                        items: [
                            {
                                title: 'Create PO',
                                href: '/purchasing/orders/create',
                                showInMenu: true
                            },
                            { title: 'View POs', href: '/purchasing/orders', showInMenu: true }
                        ]
                    },
                    {
                        title: 'Suppliers',
                        items: [
                            {
                                title: 'Supplier List',
                                href: '/purchasing/suppliers',
                                showInMenu: true
                            },
                            {
                                title: 'Add Supplier',
                                href: '/purchasing/suppliers/create',
                                showInMenu: true
                            }
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
                            { title: 'Sales Orders', href: '/sales/orders', showInMenu: true },
                            { title: 'Invoices', href: '/sales/invoices', showInMenu: true }
                        ]
                    }
                ]
            }
        ]
    }
];

const sampleMyStuff = {
    groups: [
        {
            items: [{ title: 'My Profile', href: '#/profile' }]
        },
        {
            items: [{ title: 'My Settings', href: '#/settings' }]
        }
    ]
};

export default {
    title: 'Components/Navigation',
    component: Navigation,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ height: '200px' }}>
                <Story />
            </div>
        )
    ],
    args: {
        sections: sampleSections,
        loading: false,
        username: 'jsmith',
        myStuff: sampleMyStuff,
        handleSignOut: action('handleSignOut')
    }
};

export const Default = {};

export const Loading = {
    args: {
        loading: true
    }
};

export const NoSections = {
    name: 'No sections (empty bar)',
    args: {
        sections: null
    }
};
