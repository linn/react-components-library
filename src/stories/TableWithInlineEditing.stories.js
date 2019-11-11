import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
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
        key: 'cITCode',
        type: 'dropdown',
        options: ['cit1', 'cit2', 'cit3']
    }
];

const pageOptions = {
    orderBy: '',
    orderAscending: false,
    currentPage: 0,
    rowsPerPage: 10
};

let content = [
    {
        id: 1,
        operationNumber: 2,
        description: 'ATE TEST',
        cITCode: 'cit1'
    },
    {
        id: 2,
        operationNumber: 10,
        description: 'pre build',
        cITCode: 'cit1'
    },
    {
        id: 3,
        operationNumber: 20,
        description: 'fit to topside',
        cITCode: 'cit1'
    },
    {
        id: 4,
        operationNumber: 30,
        description: 'qc',
        cITCode: 'cit1'
    }
];

storiesOf('TableWithInlineEditing', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .add('allowed to edit, add and delete', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={{}}
            allowedToEdit
            allowedToCreate
            allowedToDelete
        />
    ))
    .add('allowed to edit and add', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={{}}
            allowedToEdit
            allowedToCreate
        />
    ))
    .add('allowed to edit only', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={{}}
            allowedToEdit
        />
    ))
    .add('Not allowed to edit', () => (
        <TableWithInlineEditing columnsInfo={columnsInfo} content={content} updateContent={{}} />
    ));
