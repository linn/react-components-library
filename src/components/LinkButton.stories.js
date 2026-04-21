import LinkButton from './LinkButton';

export default {
    title: 'Components/LinkButton',
    component: LinkButton,
    tags: ['autodocs'],
    args: {
        text: 'View details',
        to: 'https://example.com',
        external: true,
        newTab: false,
        disabled: false,
        tooltip: null
    }
};

export const Default = {};

export const ExternalNewTab = {
    name: 'External link (new tab)',
    args: {
        text: 'Open in new tab',
        to: 'https://example.com',
        external: true,
        newTab: true
    }
};

export const WithTooltip = {
    name: 'With tooltip',
    args: {
        text: 'View record',
        tooltip: 'Navigate to the full record',
        to: 'https://example.com',
        external: true
    }
};

export const Disabled = {
    args: {
        text: 'Unavailable',
        disabled: true,
        to: 'https://example.com',
        external: true
    }
};

export const DisabledWithTooltip = {
    name: 'Disabled with tooltip',
    args: {
        text: 'Unavailable',
        disabled: true,
        tooltip: 'You do not have permission to view this',
        to: 'https://example.com',
        external: true
    }
};
