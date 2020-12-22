import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ExportButton from '../components/ExportButton';

export default {
    title: 'Components/ExportButton',

    decorators: [
        story => <div style={{ position: 'absolute', left: '50%' }}>{story()}</div>,
        withKnobs
    ]
};

export const Default = () => <ExportButton text={text('href', '/href/')} href="" />;

Default.story = {
    name: 'default'
};
