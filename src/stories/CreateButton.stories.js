import React from 'react';
import StoryRouter from 'storybook-react-router';

import CreateButton from '../components/CreateButton';

export default {
    title: 'Components/CreateButton',

    decorators: [
        StoryRouter(),
        story => <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
    ]
};

export const Default = () => <CreateButton createUrl="/create" />;

Default.story = {
    name: 'default'
};
