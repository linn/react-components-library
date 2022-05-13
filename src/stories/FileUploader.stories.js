/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import providers from './renderUtils/Providers';
import FileUploader from '../components/FileUploader';

const actions = {
    backClick: action('Back')
};

export default {
    title: 'Components/FileUploader',
    decorators: [story => <div>{providers(story)}</div>],
    component: FileUploader
};

export const Default = args => (
    <FileUploader
        {...actions}
        {...args}
        doUpload={() => {}}
        error={null}
        prepareUpload={() => {}}
        snackbarVisible={false}
        setSnackbarVisible={() => {}}
    />
);

Default.story = {
    name: 'default'
};
