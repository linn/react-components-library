/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from '../FileUploader';
import render from '../../test-utils';

const doUpload = jest.fn();

describe('When default props', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(<FileUploader doUpload={doUpload} />);
    });
    test('Should render default title', () => {
        expect(screen.getByText('File Uploader')).toBeInTheDocument();
    });
    test('Should render default helperText', () => {
        expect(screen.getByText('Upload a File')).toBeInTheDocument();
    });
    test('Upload button should be disabled...', () => {
        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        expect(uploadButton).toBeDisabled();
    });
});

describe('When file', () => {
    beforeEach(() => {
        const blob = new Blob([''], { type: 'text/csv' });
        jest.clearAllMocks();
        render(<FileUploader doUpload={doUpload} initialFile={blob} />);
    });
    test('Upload button should be enabled...', () => {
        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        expect(uploadButton).not.toBeDisabled();
    });
    test('should call doUpload on button click...', async () => {
        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadButton);
        await waitFor(() => {
            expect(doUpload).toHaveBeenCalledTimes(1);
        });
    });
});

describe('When Custom title / helper Text', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <FileUploader doUpload={doUpload} title="Some Title" helperText="Some Helpful text" />
        );
    });
    test('Should render custom title', () => {
        expect(screen.getByText('Some Title')).toBeInTheDocument();
    });
    test('Should render custom helperText', () => {
        expect(screen.getByText('Some Helpful text')).toBeInTheDocument();
    });
});

describe('When succesful result', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <FileUploader
                doUpload={doUpload}
                result={{
                    success: true,
                    message: 'Woohoo'
                }}
                snackbarVisible
            />
        );
    });
    test('Should render snackbar', () => {
        expect(screen.getByText('Woohoo')).toBeInTheDocument();
    });
});

describe('When uerrors in result', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <FileUploader
                doUpload={doUpload}
                result={{
                    success: false,
                    message: 'The following errors occured with your file:',
                    errors: [
                        { descriptor: 'PART A', message: 'Part too small' },
                        { descriptor: 'PART B', message: 'Part too large' }
                    ]
                }}
                snackbarVisible
            />
        );
    });
    test('Should render errors', () => {
        expect(
            screen.getByText('The following errors occured with your file:')
        ).toBeInTheDocument();
        expect(screen.getByText('PART A - Part too small')).toBeInTheDocument();
        expect(screen.getByText('PART B - Part too large')).toBeInTheDocument();
    });
});

describe('When dropping a file the browser has no file system handle for', () => {
    // An attachment dragged straight out of Outlook has no path on disk. On a secure page the
    // browser then gives null for the dropped item's file system handle, although the file itself
    // is on the drop.
    let originalIsSecureContext;

    beforeEach(async () => {
        jest.clearAllMocks();
        originalIsSecureContext = globalThis.isSecureContext;
        globalThis.isSecureContext = true;

        render(<FileUploader doUpload={doUpload} />);

        const attachment = new File(['%PDF-1.4'], 'invoice.pdf', { type: 'application/pdf' });
        const droppedItem = {
            kind: 'file',
            type: 'application/pdf',
            getAsFile: () => attachment,
            getAsFileSystemHandle: () => Promise.resolve(null)
        };
        const dropBox = screen.getByText('Drop the file here or click to browse...');

        fireEvent.drop(dropBox, {
            dataTransfer: {
                types: ['Files'],
                items: [droppedItem],
                files: [attachment]
            }
        });

        await screen.findByText('invoice.pdf');
    });

    afterEach(() => {
        globalThis.isSecureContext = originalIsSecureContext;
    });

    test('Should show the dropped file', () => {
        expect(screen.getByText('invoice.pdf')).toBeInTheDocument();
    });

    test('Upload button should be enabled...', () => {
        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        expect(uploadButton).not.toBeDisabled();
    });
});
