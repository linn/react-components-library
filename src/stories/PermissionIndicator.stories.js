
import providers from './renderUtils/Providers';
import PermissionIndicator from '../components/PermissionIndicator';

export default {
    title: 'Components/PermissionIndicator',
    decorators: [story => providers(story)],
    component: PermissionIndicator
};

export const Default = args => (
    <PermissionIndicator {...args} />
);

Default.story = {
    name: 'default'
};

Default.args = {
    hasPermission: true,
    hasPermissionMessage: 'You can do this',
    noPermissionMessage: 'You cannot do this'
};

export const NoPermssion = args => <PermissionIndicator {...args} />;

NoPermssion.story = {
    name: 'no permission'
};

NoPermssion.args = {
    hasPermission: false,
    hasPermissionMessage: 'You can do this',
    noPermissionMessage: 'You cannot do this'
};
