import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ExportButton from '../components/ExportButton';

storiesOf('ExportButton', module)
    .addDecorator(story => <div style={{ position: 'absolute', left: '50%' }}>{story()}</div>)
    .addDecorator(withKnobs)
    .add('default', () => <ExportButton text={text('href', '/href/')} href="" />);
