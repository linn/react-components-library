import PermissionIndicator from './PermissionIndicator';

export default {
    title: 'Components/PermissionIndicator',
    component: PermissionIndicator,
    tags: ['autodocs'],
    args: {
        hasPermission: true,
        hasPermissionMessage: 'You have permission for this page',
        noPermissionMessage: 'You do not have permission for this page'
    }
};

export const Default = {};

export const WithPermission = {
    name: 'Has permission',
    args: {
        hasPermission: true
    }
};

export const WithoutPermission = {
    name: 'No permission',
    args: {
        hasPermission: false
    }
};

export const CustomMessages = {
    name: 'Custom messages',
    args: {
        hasPermission: true,
        hasPermissionMessage: 'Edit mode enabled',
        noPermissionMessage: 'Read-only mode'
    }
};
