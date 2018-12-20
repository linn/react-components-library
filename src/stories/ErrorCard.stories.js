import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { text } from '@storybook/addon-knobs';

import ErrorCard from '../components/ErrorCard';

storiesOf('ErrorCard', module)
    .addDecorator(story => (
        <div style={{ padding: '3rem', width: "100%" }}>
            {story()}
        </div>
    ))
    .addDecorator(withKnobs)
    .add('default ', () => (
        <ErrorCard errorMessage={text('errorMessage', 'Error message')} />
    ));