import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import CreateButton from '../components/CreateButton';

storiesOf('CreateButton', module)
    .addDecorator(StoryRouter())

    .addDecorator(story => (
        <div style={{ position: 'absolute', left: '5%', top: '10%' }}>{story()}</div>
    ))
    .add('default', () => <CreateButton createUrl="/create" />);
