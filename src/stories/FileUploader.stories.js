/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import providers from './renderUtils/Providers';
import FileUploader from '../components/FileUploader';
import FileUploaderDocs from './FileUploaderDocs.mdx';

const actions = {
    backClick: action('Back')
};

export default {
    title: 'Components/FileUploader',
    decorators: [story => <div>{providers(story)}</div>],
    component: FileUploader,
    parameters: {
        docs: {
            page: FileUploaderDocs
        }
    }
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

export const NotInitiallyExpanded = args => (
    <FileUploader
        {...actions}
        {...args}
        doUpload={() => {}}
        error={null}
        prepareUpload={() => {}}
        snackbarVisible={false}
        setSnackbarVisible={() => {}}
        initiallyExpanded={false}
    />
);

export const FileUploadErrors = args => (
    <FileUploader
        {...actions}
        {...args}
        result={{
            success: false,
            message: 'The following errors occured with your file:',
            errors: [
                { descriptor: 'PART A', message: 'Part too small' },
                { descriptor: 'PART B', message: 'Part too large' }
            ]
        }}
        doUpload={() => {}}
        error={null}
        prepareUpload={() => {}}
        snackbarVisible={false}
        setSnackbarVisible={() => {}}
    />
);

export const FileUploadSuccess = args => (
    <FileUploader
        {...actions}
        {...args}
        result={{
            success: true,
            message: 'Woohoo'
        }}
        doUpload={() => {}}
        error={null}
        prepareUpload={() => {}}
        snackbarVisible
        setSnackbarVisible={() => {}}
    />
);

Default.story = {
    name: 'default'
};
