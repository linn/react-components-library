import { action } from 'storybook/actions';
import SaveBackCancelButtons from './SaveBackCancelButtons';

export default {
    title: 'Components/SaveBackCancelButtons',
    component: SaveBackCancelButtons,
    tags: ['autodocs'],
    args: {
        saveClick: action('saveClick'),
        cancelClick: action('cancelClick'),
        backClick: action('backClick'),
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
