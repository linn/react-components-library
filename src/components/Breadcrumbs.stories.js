import { fn } from 'storybook/test';
import Breadcrumbs from './Breadcrumbs';

export default {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
    args: {
        navigate: fn(),
        homeUrl: 'https://app.linn.co.uk',
        rootPathLength: 2,
        location: { pathname: '/purchasing/orders/12345' }
    }
};

export const Default = {};

export const ShallowPath = {
    name: 'Shallow path',
    args: {
        location: { pathname: '/products' }
    }
};

export const DeepPath = {
    name: 'Deep path',
    args: {
        location: { pathname: '/manufacturing/works-orders/12345/operations' }
    }
};

export const TrailingSlash = {
    name: 'Trailing slash (normalised)',
    args: {
        location: { pathname: '/sales/invoices/' }
    }
};

export const CustomHomeUrl = {
    name: 'Custom home URL',
    args: {
        homeUrl: 'https://internal.example.com',
        location: { pathname: '/admin/settings' }
    }
};
