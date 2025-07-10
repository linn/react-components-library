import Page from '../components/Page';

export default {
    title: 'Page',
    component: Page,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        children: <div />,
        navigate: () => {},
        location: { pathname: 'a/test/path' },
        width: 'l',
        requestErrors: [],
        showRequestErrors: false,
        homeUrl: null,
        showBreadcrumbs: true,
        title: null,
        defaultAppTitle: null
    }
};

export const Default = {
    args: {
        primary: true,
        label: 'Page'
    }
};
