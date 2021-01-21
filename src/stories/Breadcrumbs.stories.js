import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs, object } from '@storybook/addon-knobs';
import Breadcrumbs from '../components/Breadcrumbs';

const props = {
    history: {
        push: () => {},
        location: {
            pathname: '/a/test/path'
        }
    }
};

export default {
    title: 'Components/Breadcrumbs',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
            </MemoryRouter>
        ),
        withKnobs
    ],
    component: Breadcrumbs
};

export const Default = () => <Breadcrumbs {...props} history={object('location', props.history)} />;
