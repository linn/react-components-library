import React from 'react';
import { storiesOf } from '@storybook/react';
import Loading from '../components/Loading';

storiesOf('Loading', module)
    .addDecorator(story => <div>{story()}</div>)
    .add('default', () => <Loading />);
