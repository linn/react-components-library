import React from 'react';
import { MemoryRouter } from 'react-router';
import CreateButton from '../components/CreateButton';

export default {
    title: 'Components/CreateButton',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
            </MemoryRouter>
        )
    ],
    component: CreateButton
};

export const Default = () => <CreateButton createUrl="/create" />;

Default.story = {
    name: 'default'
};
