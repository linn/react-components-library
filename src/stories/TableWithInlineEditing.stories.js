import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import TableWithInlineEditing from '../components/TableWithInlineEditing';
import { linnTheme } from '../themes/linnTheme';

const [content, setContent] = useState({});

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

setContent([
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
]);

const updateContent = newContent => {
    setContent(newContent);
};

storiesOf('PaginatedTable', module)
    .addDecorator(story => <div>{story()}</div>)
    .addDecorator(withKnobs)
    .addDecorator(StoryRouter())
    .addDecorator(story => (
        <ThemeProvider theme={linnTheme}>
            <div>{story()}</div>
        </ThemeProvider>
    ))
    .add('allowed to edit', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={updateContent}
            allowedToEdit
        />
    ))
    .add('without edit permission', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={updateContent}
            allowedToEdit={false}
        />
    ));
