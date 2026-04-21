import { fn } from 'storybook/test';
import FileUploader from './FileUploader';

export default {
    title: 'Components/FileUploader',
    component: FileUploader,
    tags: ['autodocs'],
    args: {
        title: 'File Uploader',
        helperText: 'Upload a File',
        initiallyExpanded: true,
        loading: false,
        result: null,
        snackbarVisible: false,
        setSnackbarVisible: fn(),
        onFileSelect: fn(),
        doUpload: fn()
    }
};

export const Default = {};

export const Collapsed = {
    args: {
        initiallyExpanded: false
    }
};

export const Loading = {
    args: {
        loading: true
    }
};

export const WithError = {
    name: 'Upload error',
    args: {
        result: {
            success: false,
            message: 'File upload failed',
            errors: [
                { descriptor: 'Row 1', message: 'Invalid format' },
                { descriptor: 'Row 2', message: 'Missing required field' }
            ]
        }
    }
};

export const CustomTitle = {
    name: 'Custom title and helper text',
    args: {
        title: 'Import CSV',
        helperText: 'Select a CSV file to import records'
    }
};
