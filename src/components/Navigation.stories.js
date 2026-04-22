import { SnackbarProvider } from 'notistack';
import { fn } from 'storybook/test';
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
                            { title: 'Create PO', href: '#', showInMenu: true },
                            { title: 'View POs', href: '#', showInMenu: true }
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
                            { title: 'Sales Orders', href: '#', showInMenu: true },
                            { title: 'Invoices', href: '#', showInMenu: true }
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
            <SnackbarProvider maxSnack={3}>
                <div style={{ height: '200px' }}>
                    <Story />
                </div>
            </SnackbarProvider>
        )
    ],
    args: {
        sections: sampleSections,
        loading: false,
        username: 'jsmith',
        myStuff: sampleMyStuff,
        notifications: [],
        handleSignOut: fn()
    }
};

export const Default = {};

export const Loading = {
    args: {
        loading: true
    }
};

export const WithNotifications = {
    name: 'With notifications',
    args: {
        notifications: [
            { title: 'Order Approved', content: 'PO-12345 has been approved' },
            { title: 'Low Stock Alert', content: 'Widget A is running low' }
        ]
    }
};

export const NoSections = {
    name: 'No sections (empty bar)',
    args: {
        sections: null
    }
};
