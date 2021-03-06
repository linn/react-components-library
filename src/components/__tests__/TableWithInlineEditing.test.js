﻿import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import TableWithInlineEditing from '../TableWithInlineEditing';

afterEach(cleanup);

const updateContent = jest.fn();

const content = [
    {
        code: 1,
        description: 'Descripticon',
        options: 'choice1',
        id: 1
    },
    {
        code: 22,
        description: 'Descrip',
        options: 'choice2',
        id: 2
    },
    { code: 333, description: '3rd one', options: 'choice1', id: 3 },
    { code: 4, description: 'four', options: 'choice1', id: 4 }
];

const columnsInfo = [
    {
        title: 'Item code',
        key: 'code',
        type: 'number'
    },
    {
        title: 'The Description',
        key: 'description',
        type: 'text'
    },
    {
        title: 'dropdown option',
        key: 'options',
        type: 'dropdown',
        options: ['choice1', 'choice2', 'choice3'],
        updateValues: newVal => [
            {
                propertyName: 'code',
                value: `options was changed to ${newVal} which caused me to change`
            }
        ]
    }
];
const defaultProps = {
    content,
    columnsInfo,
    updateContent,
    allowedToEdit: true
};

describe('When loaded', () => {
    test('should display table', () => {
        const { queryByRole } = render(<TableWithInlineEditing {...defaultProps} />);
        expect(queryByRole('table')).toBeInTheDocument();
    });

    test('should display the 4 table entries, specifically the number options', () => {
        const { getByText } = render(<TableWithInlineEditing {...defaultProps} />);
        const firstItem = getByText('1');
        const secondItem = getByText('22');
        const thirdItem = getByText('333');
        const fourthItem = getByText('4');
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
        expect(fourthItem).toBeInTheDocument();
    });

    test('should display the text options', () => {
        const { getByText } = render(<TableWithInlineEditing {...defaultProps} />);
        const firstItem = getByText('Descripticon');
        const secondItem = getByText('Descrip');
        const thirdItem = getByText('3rd one');
        const fourthItem = getByText('four');
        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
        expect(fourthItem).toBeInTheDocument();
    });

    test('should display dropdown option', () => {
        const { getByText } = render(<TableWithInlineEditing {...defaultProps} />);
        const item = getByText('choice2');
        expect(item).toBeInTheDocument();
    });
});

describe('When allowed to edit', () => {
    test('should update to allow input upon click', () => {
        const { getByText, getByDisplayValue } = render(
            <TableWithInlineEditing {...defaultProps} />
        );
        const item = getByText('1');
        fireEvent.click(item);
        const input = getByDisplayValue('1');

        expect(input).toBeInTheDocument();
        expect(input.type).toBe('number');
    });

    test('should pass updated content to function upon first row edit', () => {
        const { getByText, getByDisplayValue } = render(
            <TableWithInlineEditing {...defaultProps} />
        );
        const item = getByText('1');
        fireEvent.click(item);
        const input = getByDisplayValue('1');
        fireEvent.change(input, {
            target: { value: '11' }
        });

        const newContent = [
            {
                code: 11,
                description: 'Descripticon',
                options: 'choice1',
                id: 1
            },
            {
                code: 22,
                description: 'Descrip',
                options: 'choice2',
                id: 2
            },
            { code: 333, description: '3rd one', options: 'choice1', id: 3 },
            { code: 4, description: 'four', options: 'choice1', id: 4 }
        ];

        expect(updateContent).toHaveBeenCalledWith(newContent);
    });

    test('should update when second row dropdown changed', () => {
        const { getByText, getByDisplayValue } = render(
            <TableWithInlineEditing {...defaultProps} />
        );
        const item = getByText('choice2');
        fireEvent.click(item);
        const input = getByDisplayValue('choice2');
        fireEvent.change(input, {
            target: { value: 'choice3' }
        });

        const newContent = [
            {
                code: 1,
                description: 'Descripticon',
                options: 'choice1',
                id: 1
            },
            {
                code: 'options was changed to choice3 which caused me to change',
                description: 'Descrip',
                options: 'choice3',
                id: 2
            },
            { code: 333, description: '3rd one', options: 'choice1', id: 3 },
            { code: 4, description: 'four', options: 'choice1', id: 4 }
        ];

        expect(updateContent).toHaveBeenCalledWith(newContent);
    });

    test('should update last row description', () => {
        const { getByText, getByDisplayValue } = render(
            <TableWithInlineEditing {...defaultProps} />
        );
        const item = getByText('four');
        fireEvent.click(item);
        const input = getByDisplayValue('four');
        fireEvent.change(input, {
            target: { value: 'four4' }
        });

        const newContent = [
            {
                code: 1,
                description: 'Descripticon',
                options: 'choice1',
                id: 1
            },
            {
                code: 22,
                description: 'Descrip',
                options: 'choice2',
                id: 2
            },
            { code: 333, description: '3rd one', options: 'choice1', id: 3 },
            { code: 4, description: 'four4', options: 'choice1', id: 4 }
        ];

        expect(updateContent).toHaveBeenCalledWith(newContent);
    });
});

describe('When allowed to create', () => {
    test('should have create button', () => {
        const { queryByTestId } = render(
            <TableWithInlineEditing {...defaultProps} allowedToCreate />
        );
        expect(queryByTestId('addIcon')).toBeInTheDocument();
    });
});

describe('When allowed to delete', () => {
    test('should have delete button', () => {
        const { queryAllByTestId } = render(
            <TableWithInlineEditing {...defaultProps} allowedToDelete />
        );
        expect(queryAllByTestId('deleteIcon').length).toBe(4);
    });
});

describe('When not allowed to edit', () => {
    test('should not update to allow input upon click', () => {
        const { getByText, queryByDisplayValue, queryByRole, queryByText } = render(
            <TableWithInlineEditing {...defaultProps} allowedToEdit={false} />
        );
        const item = getByText('1');
        fireEvent.click(item);

        expect(queryByDisplayValue('1')).not.toBeInTheDocument();
        expect(queryByRole('input')).not.toBeInTheDocument();
        //expect input not to be there, but span still should be
        expect(queryByText('1')).toBeInTheDocument();
    });
});

describe('When not allowed to create', () => {
    test('should not have create button', () => {
        const { queryByTestId } = render(<TableWithInlineEditing {...defaultProps} />);
        expect(queryByTestId('addIcon')).not.toBeInTheDocument();
    });
});

describe('When not allowed to delete', () => {
    test('should not have delete button', () => {
        const { queryByTestId } = render(<TableWithInlineEditing {...defaultProps} />);
        expect(queryByTestId('deleteIcon')).not.toBeInTheDocument();
    });
});

describe('when state passed in', () => {
    test('should not mutate the state of parent component', () => {
        const copyOfContent = [...content];

        const { getByText, getByDisplayValue } = render(
            <TableWithInlineEditing {...defaultProps} />
        );
        const item = getByText('1');
        fireEvent.click(item);
        const input = getByDisplayValue('1');
        fireEvent.change(input, {
            target: { value: '11' }
        });

        expect(copyOfContent).toEqual(content);
    });
});
