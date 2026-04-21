import { fn } from 'storybook/test';
import SnackbarMessage from './SnackbarMessage';

export default {
    title: 'Components/SnackbarMessage',
    component: SnackbarMessage,
    tags: ['autodocs'],
    args: {
        onClose: fn(),
        message: 'Record saved successfully',
        visible: true,
        timeOut: null
    }
};

export const Default = {};

export const Hidden = {
    args: {
        visible: false,
        message: 'This message is not shown'
    }
};

export const LongMessage = {
    name: 'Long message',
    args: {
        message: 'Your changes have been saved and the record has been updated successfully.'
    }
};
