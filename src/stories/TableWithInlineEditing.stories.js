/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ThemeProvider from '@mui/styles/ThemeProvider';
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
        story => (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={linnTheme}>
                    <div>{story()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        )
    ],
    component: TableWithInlineEditing
};

export const AllowedToEditAddAndDelete = args => <TableWithInlineEditing {...args} />;

AllowedToEditAddAndDelete.story = {
    name: 'allowed to edit, add and delete'
};

AllowedToEditAddAndDelete.args = {
    columnsInfo,
    content,
    updateContent: () => {},
    allowedToEdit: true,
    allowedToCreate: true,
    allowedToDelete: true
};

export const AllowedToEditAndAdd = args => <TableWithInlineEditing {...args} />;

AllowedToEditAndAdd.story = {
    name: 'allowed to edit and add'
};

AllowedToEditAddAndDelete.args = {
    columnsInfo,
    content,
    updateContent: () => {},
    allowedToEdit: true,
    allowedToCreate: true
};

export const AllowedToEditOnly = args => <TableWithInlineEditing {...args} />;

AllowedToEditOnly.story = {
    name: 'allowed to edit only'
};

AllowedToEditOnly.args = {
    columnsInfo,
    content,
    updateContent: () => {},
    allowedToEdit: true
};

export const NotAllowedToEdit = args => <TableWithInlineEditing {...args} />;

NotAllowedToEdit.story = {
    name: 'Not allowed to edit'
};

NotAllowedToEdit.args = {
    columnsInfo,
    content,
    updateContent: () => {}
};
