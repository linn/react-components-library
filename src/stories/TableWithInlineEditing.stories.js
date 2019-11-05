import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('TableWithInlineEditing', module)
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
            updateContent={() => {}}
            allowedToEdit
        />
    ))
    .add('without edit permission', () => (
        <TableWithInlineEditing
            columnsInfo={columnsInfo}
            content={content}
            updateContent={() => {}}
            allowedToEdit={false}
        />
    ));
