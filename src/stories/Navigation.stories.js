import { fn } from 'storybook/test';
import Navigation from '../components/Navigation';
import menu from '../../public/menu.json';

export default {
    title: 'Navigation',
    component: Navigation,
    tags: ['autodocs'],
    parameters: {},
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        sections: menu.sections,
        myStuff: menu.myStuff,
        username: 'username',

        loading: false,
        authRoot: '#',
        history: {},
        markNotificationSeen: fn()
    }
};

export const Default = {
    args: {
        primary: true,
        label: 'Navigation'
    }
};

export const WithSignOutLink = {
    name: 'With sign out link',
    args: {
        handleSignOut: fn()
    }
};
