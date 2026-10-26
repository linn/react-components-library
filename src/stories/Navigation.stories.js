import { action } from 'storybook/actions';
import Navigation from '../components/Navigation';
import menu from '../../public/menu.json';

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
        loading: false
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
        handleSignOut: action('handleSignOut')
    }
};
