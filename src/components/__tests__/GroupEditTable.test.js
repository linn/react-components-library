/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import GroupEditTable from '../editableTable/GroupEditTable';

afterEach(cleanup);

const defaultColumns = [
    { title: 'col1', id: 'col1', type: 'text', editable: true },
    { title: 'col2', id: 'col2', type: 'text', editable: true }
];

const defaultRows = [
    {
        id: 0,
        col1: 'text1',
        col2: 'text2'
    },
    {
        id: 1,
        col1: 'text3',
        col2: 'text4'
    }
];

const handleEditClick = jest.fn();
const updateRow = jest.fn();
const deleteRow = jest.fn();
const addRow = jest.fn();
const tableValid = jest.fn();
const removeRow = jest.fn();
const resetRow = jest.fn();
const setRowToBeDeleted = jest.fn();
const setRowToBeSaved = jest.fn();

const defaultProps = {
    columns: defaultColumns,
    rows: defaultRows,
    handleEditClick,
    updateRow,
    validateRow: () => true,
    deleteRow,
    addRow,
    tableValid,
    removeRow,
    resetRow,
    setRowToBeDeleted,
    setRowToBeSaved
};

describe('<GroupEditTable />', () => {
    describe('when rendering with defaul props', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<GroupEditTable {...defaultProps} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render edit and add buttons', () => {
            const { getByTestId, getAllByTestId } = render(<GroupEditTable {...defaultProps} />);

            const editButtons = getAllByTestId('editButton');
            const addButton = getByTestId('addButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();
        });
    });

    describe('when not editable', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<GroupEditTable {...defaultProps} editable={false} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should not render buttons', () => {
            const { queryByTestId } = render(<GroupEditTable {...defaultProps} editable={false} />);

            expect(queryByTestId('editButton')).not.toBeInTheDocument();
            expect(queryByTestId('addButton')).not.toBeInTheDocument();
        });
    });

    describe('when table is editable but adding new rows is disabled', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<GroupEditTable {...defaultProps} editable={false} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render edit buttons', () => {
            const { getAllByTestId } = render(<GroupEditTable {...defaultProps} />);

            const editButtons = getAllByTestId('editButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();
        });

        it('should not render add button', () => {
            const { queryByTestId } = render(<GroupEditTable {...defaultProps} editable={false} />);
            expect(queryByTestId('addButton')).not.toBeInTheDocument();
        });
    });

    describe('when deleting rows pre edit is enabled', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<GroupEditTable {...defaultProps} deleteRowPreEdit />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render the add, edit and delete buttons when deleteRow prop is present', () => {
            const { getByTestId, getAllByTestId } = render(
                <GroupEditTable {...defaultProps} deleteRowPreEdit deleteRow={jest.fn()} />
            );

            const editButtons = getAllByTestId('editButton');
            const addButton = getByTestId('addButton');
            const deleteButtons = getAllByTestId('deleteButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            expect(deleteButtons).toHaveLength(2);
            expect(deleteButtons[0]).not.toBeDisabled();
            expect(deleteButtons[1]).not.toBeDisabled();
        });

        it('should not render delete buttons when removeRow prop is not present', () => {
            const props = { ...defaultProps, removeRow: null };

            const { getByTestId, getAllByTestId, queryByTestId } = render(
                <GroupEditTable {...props} deleteRowPreEdit />
            );

            const editButtons = getAllByTestId('editButton');
            const addButton = getByTestId('addButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            expect(queryByTestId('deleteButton')).not.toBeInTheDocument();
        });

        it('should not render delete button for new row', () => {
            const { getByTestId, getAllByTestId } = render(
                <GroupEditTable {...defaultProps} deleteRowPreEdit deleteRow={jest.fn()} />
            );

            const addButton = getByTestId('addButton');

            expect(getAllByTestId('deleteButton')).toHaveLength(2);
            expect(getAllByTestId('deleteButton')[0]).not.toBeDisabled();
            expect(getAllByTestId('deleteButton')[1]).not.toBeDisabled();

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            fireEvent.click(addButton);

            expect(getAllByTestId('deleteButton')).toHaveLength(2);
            expect(getAllByTestId('deleteButton')[0]).not.toBeDisabled();
            expect(getAllByTestId('deleteButton')[1]).not.toBeDisabled();
        });
    });

    describe('when adding new row', () => {
        it('should not remove add button when clicked', () => {
            const { getAllByRole, getByTestId } = render(<GroupEditTable {...defaultProps} />);

            const addButton = getByTestId('addButton');

            // 4 as includes header row and row with add button
            expect(getAllByRole('row')).toHaveLength(4);

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            fireEvent.click(addButton);

            expect(addButton).toBeInTheDocument();
        });

        it('should call addRow when add button clicked', () => {
            const { getAllByRole, getByTestId, queryByTestId } = render(
                <GroupEditTable {...defaultProps} />
            );

            const addButton = getByTestId('addButton');

            // 4 as includes header row and row with add button
            expect(getAllByRole('row')).toHaveLength(4);

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
            expect(queryByTestId('saveButton')).not.toBeInTheDocument();

            fireEvent.click(addButton);

            expect(addRow).toHaveBeenCalled();
        });
    });

    describe('when editing a row', () => {
        it('should call handleEditClick when edit button clicked', () => {
            const { getAllByTestId, queryByTestId } = render(<GroupEditTable {...defaultProps} />);

            const editButtons = getAllByTestId('editButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();

            expect(queryByTestId('saveButton')).not.toBeInTheDocument();
            expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
            expect(queryByTestId('deleteButton')).not.toBeInTheDocument();

            fireEvent.click(editButtons[0]);

            expect(handleEditClick).toHaveBeenCalled();
        });

        it('should show save, cancel and delete buttons when row is editing', () => {
            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows };

            const { getAllByTestId, getByTestId } = render(<GroupEditTable {...props} />);

            expect(getAllByTestId('editButton')).toHaveLength(2);
            expect(getByTestId('saveButton')).toBeInTheDocument();
            expect(getByTestId('cancelButton')).toBeInTheDocument();
            expect(getByTestId('deleteButton')).toBeInTheDocument();
        });

        it('should not show delete button when row is editing but removeRow is null', () => {
            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows, removeRow: null };

            const { getAllByTestId, queryByTestId, getByTestId } = render(
                <GroupEditTable {...props} />
            );

            expect(getAllByTestId('editButton')).toHaveLength(2);
            expect(getByTestId('saveButton')).toBeInTheDocument();
            expect(getByTestId('cancelButton')).toBeInTheDocument();
            expect(queryByTestId('deleteButton')).not.toBeInTheDocument();
        });

        it('should show multiple save, cancel and delete buttons when more than one row is editing', () => {
            const newRows = [
                ...defaultRows,
                ...[
                    { id: 2, col1: 'text5', col2: 'text6', editing: true },
                    { id: 3, col1: 'text7', col2: 'text8', editing: true }
                ]
            ];

            const props = { ...defaultProps, rows: newRows };

            const { getAllByTestId } = render(<GroupEditTable {...props} />);

            expect(getAllByTestId('editButton')).toHaveLength(2);
            expect(getAllByTestId('saveButton')).toHaveLength(2);
            expect(getAllByTestId('cancelButton')).toHaveLength(2);
            expect(getAllByTestId('deleteButton')).toHaveLength(2);
        });

        it('should not show editable ', () => {
            const newCols = [
                { title: 'col1', id: 'col1', type: 'text', editable: true },
                { title: 'col2', id: 'col2', type: 'text', editable: false }
            ];

            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows, columns: newCols };

            const { getByDisplayValue, getByText, queryByDisplayValue } = render(
                <GroupEditTable {...props} />
            );

            expect(getByDisplayValue('text5')).toBeInTheDocument();
            expect(getByText('text6')).toBeInTheDocument();
            expect(queryByDisplayValue('text6')).not.toBeInTheDocument();
        });

        it('should call setRowToBeSaved when save is clicked', () => {
            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows };

            const { getByTestId } = render(<GroupEditTable {...props} />);

            const saveButton = getByTestId('saveButton');

            expect(saveButton).not.toBeDisabled();
            fireEvent.click(saveButton);
            expect(setRowToBeSaved).toHaveBeenCalled();
        });

        it('should disabled save button when row not valid', () => {
            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows, validateRow: () => false };

            const { getByTestId } = render(<GroupEditTable {...props} />);

            const saveButton = getByTestId('saveButton');

            expect(saveButton).toBeDisabled();
        });

        it('should not disable delte button', () => {
            const newRows = [
                ...defaultRows,
                { id: 2, col1: 'text5', col2: 'text6', editing: true }
            ];

            const props = { ...defaultProps, rows: newRows };

            const { getByTestId } = render(<GroupEditTable {...props} />);

            const deleteButton = getByTestId('deleteButton');

            expect(deleteButton).not.toBeDisabled();
            fireEvent.click(deleteButton);
            expect(setRowToBeDeleted).toHaveBeenCalled();
        });
    });
});
