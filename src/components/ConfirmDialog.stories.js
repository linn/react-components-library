import { fn } from 'storybook/test';
import ConfirmDialog from './ConfirmDialog';

export default {
    title: 'Components/ConfirmDialog',
    component: ConfirmDialog,
    tags: ['autodocs'],
    args: {
        closeDialog: fn(),
        onConfirm: fn(),
        onCancel: fn(),
        visible: true,
        title: 'Are you sure?',
        primaryText: 'This action cannot be undone.',
        secondaryText: null,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        maxWidth: 'md'
    }
};

export const Default = {};

export const WithSecondaryText = {
    name: 'With secondary text',
    args: {
        primaryText: 'You are about to delete this record.',
        secondaryText: 'All associated data will be permanently removed.'
    }
};

export const DeleteConfirmation = {
    name: 'Delete confirmation',
    args: {
        title: 'Delete record?',
        primaryText: 'Are you sure you want to delete this item?',
        secondaryText: 'This action is permanent and cannot be reversed.',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Keep'
    }
};

export const Closed = {
    args: {
        visible: false
    }
};

export const NarrowWidth = {
    name: 'Narrow width',
    args: {
        maxWidth: 'sm',
        primaryText: 'Confirm this action.'
    }
};
