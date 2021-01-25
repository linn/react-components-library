/* eslint-disable react/jsx-props-no-spreading */
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

export const Default = args => <CreateButton {...args} />;

Default.story = {
    name: 'default'
};

Default.args = {
    creatUrl: '/create'
};
