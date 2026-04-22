import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import Page from './Page';

export default {
    title: 'Components/Page',
    component: Page,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        children: <p>Page content goes here.</p>,
        navigate: fn(),
        location: { pathname: '/purchasing/orders/12345' },
        width: 'l',
        requestErrors: [],
        showRequestErrors: false,
        homeUrl: 'https://app.linn.co.uk',
        showBreadcrumbs: true,
        title: null,
        defaultAppTitle: null
    }
};

export const Default = {};

export const NoBreadcrumbs = {
    name: 'No breadcrumbs',
    args: {
        showBreadcrumbs: false
    }
};

export const NarrowWidth = {
    name: 'Narrow width',
    args: {
        width: 's'
    }
};

export const WideWidth = {
    name: 'Full width',
    args: {
        width: 'xl'
    }
};

export const WithTitle = {
    name: 'With page title',
    args: {
        title: 'Purchase Orders'
    }
};
