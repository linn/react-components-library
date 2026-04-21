import { MemoryRouter } from 'react-router-dom';
import LinkField from './LinkField';

export default {
    title: 'Components/LinkField',
    component: LinkField,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        value: 'View product details',
        to: 'https://example.com/products/123',
        external: true,
        openLinksInNewTabs: false,
        disabled: false,
        label: '',
        shouldRender: true
    }
};

export const Default = {};

export const WithLabel = {
    name: 'With label',
    args: {
        label: 'Product Link',
        value: 'Widget A'
    }
};

export const OpenInNewTab = {
    name: 'Open in new tab',
    args: {
        openLinksInNewTabs: true,
        value: 'External resource'
    }
};

export const Disabled = {
    args: {
        disabled: true,
        value: 'Disabled link text'
    }
};

export const NotRendered = {
    name: 'Not rendered',
    args: {
        shouldRender: false,
        value: 'This should not appear'
    }
};

export const InternalLink = {
    name: 'Internal link (router)',
    args: {
        external: false,
        to: '/products/123',
        value: 'View product'
    }
};
