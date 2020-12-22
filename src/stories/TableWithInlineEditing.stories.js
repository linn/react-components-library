import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import TableWithInlineEditing from '../components/TableWithInlineEditing';
import { linnTheme } from '../themes/linnTheme';

const columnsInfo = [
    {
        title: 'Operation Number',
        key: 'operationNumber',
        type: 'number'
    },
    {
        title: 'Description',
        key: 'description',
        type: 'text'
    },
    {
        title: 'CIT Code',
        key: 'citCode',
        type: 'dropdown',
        options: ['cit1', 'cit2', 'cit3']
    }
];

const content = [
    {
        id: 1,
        operationNumber: 2,
        description: 'ATE TEST',
        citCode: 'cit1'
    },
    {
        id: 2,
        operationNumber: 10,
        description: 'pre build',
        citCode: 'cit1'
    },
    {
        id: 3,
        operationNumber: 20,
        description: 'fit to topside',
        citCode: 'cit1'
    },
    {
        id: 4,
        operationNumber: 30,
        description: 'qc',
        citCode: 'cit1'
    }
];

export default {
    title: 'Components/TableWithInlineEditing',

    decorators: [
        story => <div>{story()}</div>,
        withKnobs,
        StoryRouter(),
        story => (
            <ThemeProvider theme={linnTheme}>
                <div>{story()}</div>
            </ThemeProvider>
        )
    ]
};

export const AllowedToEditAddAndDelete = () => (
    <TableWithInlineEditing
        columnsInfo={columnsInfo}
        content={content}
        updateContent={() => {}}
        allowedToEdit
        allowedToCreate
        allowedToDelete
    />
);

AllowedToEditAddAndDelete.story = {
    name: 'allowed to edit, add and delete'
};

export const AllowedToEditAndAdd = () => (
    <TableWithInlineEditing
        columnsInfo={columnsInfo}
        content={content}
        updateContent={() => {}}
        allowedToEdit
        allowedToCreate
    />
);

AllowedToEditAndAdd.story = {
    name: 'allowed to edit and add'
};

export const AllowedToEditOnly = () => (
    <TableWithInlineEditing
        columnsInfo={columnsInfo}
        content={content}
        updateContent={() => {}}
        allowedToEdit
    />
);

AllowedToEditOnly.story = {
    name: 'allowed to edit only'
};

export const NotAllowedToEdit = () => (
    <TableWithInlineEditing columnsInfo={columnsInfo} content={content} updateContent={() => {}} />
);

NotAllowedToEdit.story = {
    name: 'Not allowed to edit'
};
