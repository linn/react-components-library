/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CreateButton from '../components/CreateButton';

export default {
    title: 'Components/CreateButton',
    decorators: [
        (story) => (
            <BrowserRouter>
                <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
            </BrowserRouter>
        )
    ],
    component: CreateButton
};

export const Default = () => <CreateButton createUrl="#" />;

Default.story = {
    name: 'default'
};
