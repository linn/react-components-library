/* eslint-disable react/jsx-props-no-spreading */

import { MemoryRouter } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';

export default {
    title: 'Components/Breadcrumbs',
    decorators: [
        story => (
            <MemoryRouter initialEntries={['/']}>
                <div style={{ padding: '3rem', width: '100%' }}>{story()}</div>
            </MemoryRouter>
        )
    ],
    component: Breadcrumbs
};

export const Default = args => <Breadcrumbs {...args} />;

Default.args = {
    location: {
        pathname: '/a/test/path'
    },
    navigate: () => {}
};
