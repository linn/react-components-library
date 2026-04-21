import { fn } from 'storybook/test';
import BackButton from './BackButton';

export default {
    title: 'Components/BackButton',
    component: BackButton,
    tags: ['autodocs'],
    args: {
        backClick: fn()
    }
};

export const Default = {};

export const CustomText = {
    name: 'Custom text',
    args: {
        text: 'Go Back'
    }
};

export const LongCustomText = {
    name: 'Long custom text',
    args: {
        text: 'Return to previous page'
    }
};
