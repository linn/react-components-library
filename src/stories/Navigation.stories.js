import Navigation from '../components/Navigation';
import menu from '../../public/menu.json';

export default {
    title: 'Navigation',
    component: Navigation,
    parameters: {
    },
    tags: ['autodocs'],
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
        markNotificationSeen: () => {}
    }
};

export const Primary = {
  args: {
    primary: true,
    label: 'Navigation',
  },
};
