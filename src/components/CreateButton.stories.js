import { MemoryRouter } from 'react-router-dom';
import CreateButton from './CreateButton';

export default {
    title: 'Components/CreateButton',
    component: CreateButton,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        createUrl: '/items/create',
        disabled: false
    }
};

export const Default = {};

export const Disabled = {
    args: {
        disabled: true
    }
};
