import { fn } from 'storybook/test';
import Navigation from '../components/Navigation';
import menu from '../../public/menu.json';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';

export default {
    title: 'Navigation',
    component: Navigation,
    tags: ['autodocs'],
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    args: {
        sections: menu.sections,
        myStuff: menu.myStuff,
        username: 'username',
        notifications: [],
        loading: false,
        authRoot: '#',
        history: {}
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

export const WithNotifications = {
    decorators: [
        Story => (
            <CssBaseline>
                <SnackbarProvider>
                    <Story />
                </SnackbarProvider>
            </CssBaseline>
        )
    ],
    name: 'With Notifications',
    args: {
        notifications: [{ title: 'Notification 1', content: 'Pretty notifying, huh?' }]
    }
};
