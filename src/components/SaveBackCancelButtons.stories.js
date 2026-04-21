import { fn } from 'storybook/test';
import SaveBackCancelButtons from './SaveBackCancelButtons';

export default {
    title: 'Components/SaveBackCancelButtons',
    component: SaveBackCancelButtons,
    tags: ['autodocs'],
    args: {
        saveClick: fn(),
        cancelClick: fn(),
        backClick: fn(),
        saveDisabled: false,
        showBackButton: true
    }
};

export const Default = {};

export const SaveDisabled = {
    name: 'Save disabled (shows Back)',
    args: {
        saveDisabled: true
    }
};

export const NoBackButton = {
    name: 'No back button when save disabled',
    args: {
        saveDisabled: true,
        showBackButton: false
    }
};
