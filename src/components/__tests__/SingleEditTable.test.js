/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import SingleEditTable from '../editableTable/SingleEditTable';

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

const defaultProps = {
    columns: defaultColumns,
    rows: defaultRows
};

describe('<SingleEditTable />', () => {
    describe('with default props', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<SingleEditTable {...defaultProps} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render edit and add buttons', () => {
            const { getByTestId, getAllByTestId } = render(<SingleEditTable {...defaultProps} />);

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
            const { getByText } = render(<SingleEditTable {...defaultProps} editable={false} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should not render buttons', () => {
            const { queryByTestId } = render(
                <SingleEditTable {...defaultProps} editable={false} />
            );

            expect(queryByTestId('editButton')).not.toBeInTheDocument();
            expect(queryByTestId('addButton')).not.toBeInTheDocument();
        });
    });

    describe('when table is editable but adding new rows is disabled', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<SingleEditTable {...defaultProps} editable={false} />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render edit buttons', () => {
            const { getAllByTestId } = render(<SingleEditTable {...defaultProps} />);

            const editButtons = getAllByTestId('editButton');

            expect(editButtons).toHaveLength(2);
            expect(editButtons[0]).not.toBeDisabled();
            expect(editButtons[1]).not.toBeDisabled();
        });

        it('should not render add button', () => {
            const { queryByTestId } = render(
                <SingleEditTable {...defaultProps} editable={false} />
            );
            expect(queryByTestId('addButton')).not.toBeInTheDocument();
        });
    });

    describe('when deleting rows pre edit is enabled', () => {
        it('should render rows and columns', () => {
            const { getByText } = render(<SingleEditTable {...defaultProps} deleteRowPreEdit />);

            expect(getByText('col1')).toBeInTheDocument();
            expect(getByText('col2')).toBeInTheDocument();
            expect(getByText('text1')).toBeInTheDocument();
            expect(getByText('text2')).toBeInTheDocument();
            expect(getByText('text3')).toBeInTheDocument();
            expect(getByText('text4')).toBeInTheDocument();
        });

        it('should render the add, edit and delete buttons when deleteRow prop is present', () => {
            const { getByTestId, getAllByTestId } = render(
                <SingleEditTable {...defaultProps} deleteRowPreEdit deleteRow={jest.fn()} />
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

        it('should not render delete buttons when deleteRow prop is not present', () => {
            const { getByTestId, getAllByTestId, queryByTestId } = render(
                <SingleEditTable {...defaultProps} deleteRowPreEdit />
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
                <SingleEditTable {...defaultProps} deleteRowPreEdit deleteRow={jest.fn()} />
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
        it('should remove add button when clicked', () => {
            const { getAllByRole, getByTestId } = render(<SingleEditTable {...defaultProps} />);

            const addButton = getByTestId('addButton');

            // 4 as includes header row and row with add button
            expect(getAllByRole('row')).toHaveLength(4);

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            fireEvent.click(addButton);

            expect(addButton).not.toBeInTheDocument();
        });

        it('should add a new editable row when add button clicked', () => {
            const { getAllByRole, getByTestId, queryByTestId } = render(
                <SingleEditTable {...defaultProps} />
            );

            const addButton = getByTestId('addButton');

            // 4 as includes header row and row with add button
            expect(getAllByRole('row')).toHaveLength(4);

            expect(addButton).toBeInTheDocument();
            expect(addButton).not.toBeDisabled();

            expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
            expect(queryByTestId('saveButton')).not.toBeInTheDocument();

            fireEvent.click(addButton);

            // should have same amount of rows but add button row should have been removed
            expect(getAllByRole('row')).toHaveLength(4);
            expect(addButton).not.toBeInTheDocument();
            expect(getByTestId('cancelButton')).toBeInTheDocument();
            expect(getByTestId('saveButton')).toBeInTheDocument();
        });

        it('should call save function when clicked', () => {
            const createRow = jest.fn();

            const { getByTestId } = render(
                <SingleEditTable {...defaultProps} createRow={createRow} />
            );

            fireEvent.click(getByTestId('addButton'));

            fireEvent.click(getByTestId('saveButton'));

            expect(createRow).toHaveBeenCalled();
        });

        it('should show add button and remove row when cancel button clicked', () => {
            const { getAllByRole, getByTestId, queryByTestId } = render(
                <SingleEditTable {...defaultProps} />
            );

            fireEvent.click(getByTestId('addButton'));

            fireEvent.click(getByTestId('cancelButton'));

            expect(getAllByRole('row')).toHaveLength(4);

            expect(getByTestId('addButton')).toBeInTheDocument();

            expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
            expect(queryByTestId('saveButton')).not.toBeInTheDocument();
        });
    });

    describe('when editing a row', () => {
        describe('when rows are not deletable', () => {
            it('should update buttons for row when edit button is clicked', () => {
                const { getAllByTestId, getByTestId, queryByTestId } = render(
                    <SingleEditTable {...defaultProps} />
                );

                const editButtons = getAllByTestId('editButton');

                expect(editButtons).toHaveLength(2);
                expect(editButtons[0]).not.toBeDisabled();
                expect(editButtons[1]).not.toBeDisabled();

                expect(queryByTestId('saveButton')).not.toBeInTheDocument();
                expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
                expect(queryByTestId('deleteButton')).not.toBeInTheDocument();

                fireEvent.click(editButtons[0]);

                expect(getAllByTestId('editButton')).toHaveLength(1);
                expect(getByTestId('saveButton')).toBeInTheDocument();
                expect(getByTestId('cancelButton')).toBeInTheDocument();
                expect(queryByTestId('deleteButton')).not.toBeInTheDocument();
            });

            it('should update buttons and show delete button when deleteRow is present', () => {
                const { getAllByTestId, getByTestId, queryByTestId } = render(
                    <SingleEditTable {...defaultProps} deleteRow={jest.fn()} />
                );

                const editButtons = getAllByTestId('editButton');

                expect(editButtons).toHaveLength(2);
                expect(editButtons[0]).not.toBeDisabled();
                expect(editButtons[1]).not.toBeDisabled();

                expect(queryByTestId('saveButton')).not.toBeInTheDocument();
                expect(queryByTestId('cancelButton')).not.toBeInTheDocument();
                expect(queryByTestId('deleteButton')).not.toBeInTheDocument();

                fireEvent.click(editButtons[0]);

                expect(getAllByTestId('editButton')).toHaveLength(1);
                expect(getByTestId('saveButton')).toBeInTheDocument();
                expect(getByTestId('cancelButton')).toBeInTheDocument();
                expect(getByTestId('deleteButton')).toBeInTheDocument();
            });

            it('should return row values to their original state when cancel button is clicked', () => {
                const {
                    getAllByTestId,
                    getByTestId,
                    queryByText,
                    getByText,
                    getByDisplayValue,
                    queryByDisplayValue
                } = render(<SingleEditTable {...defaultProps} />);

                const editButtons = getAllByTestId('editButton');

                expect(editButtons).toHaveLength(2);
                expect(editButtons[0]).not.toBeDisabled();
                expect(editButtons[1]).not.toBeDisabled();

                fireEvent.click(editButtons[0]);

                expect(getByDisplayValue('text1')).toBeInTheDocument();

                fireEvent.change(getByDisplayValue('text1'), {
                    target: { value: 'new text' }
                });

                expect(queryByDisplayValue('text1')).not.toBeInTheDocument();
                expect(getByDisplayValue('new text')).toBeInTheDocument();

                fireEvent.click(getByTestId('cancelButton'));

                expect(getByText('text1')).toBeInTheDocument();
                expect(queryByText('new text')).not.toBeInTheDocument();
            });

            it('should not allow editing of non editable columns', () => {
                const {
                    getAllByTestId,
                    getByText,
                    getByDisplayValue,
                    queryByDisplayValue
                } = render(
                    <SingleEditTable
                        columns={[
                            { title: 'col1', id: 'col1', type: 'text', editable: true },
                            { title: 'col2', id: 'col2', type: 'text', editable: false }
                        ]}
                        rows={defaultRows}
                    />
                );

                const editButtons = getAllByTestId('editButton');

                expect(editButtons).toHaveLength(2);
                expect(editButtons[0]).not.toBeDisabled();
                expect(editButtons[1]).not.toBeDisabled();

                // table cells dont have 'values' mui inputs do
                expect(getByText('text1')).toBeInTheDocument();
                expect(getByText('text2')).toBeInTheDocument();

                expect(queryByDisplayValue('text1')).not.toBeInTheDocument();
                expect(queryByDisplayValue('text2')).not.toBeInTheDocument();

                fireEvent.click(editButtons[0]);

                expect(getByDisplayValue('text1')).toBeInTheDocument();
                expect(getByText('text2')).toBeInTheDocument();
                expect(queryByDisplayValue('text2')).not.toBeInTheDocument();
            });

            it('should call save function when save button clicked', () => {
                const saveRow = jest.fn();

                const { getAllByTestId, getByTestId } = render(
                    <SingleEditTable {...defaultProps} saveRow={saveRow} />
                );

                const editButtons = getAllByTestId('editButton');

                fireEvent.click(editButtons[0]);

                fireEvent.click(getByTestId('saveButton'));

                expect(saveRow).toHaveBeenCalled();
            });

            it('should call delete function when delete button clicked', () => {
                const deleteRow = jest.fn();

                const { getAllByTestId, getByTestId } = render(
                    <SingleEditTable {...defaultProps} deleteRow={deleteRow} />
                );

                const editButtons = getAllByTestId('editButton');

                fireEvent.click(editButtons[0]);

                fireEvent.click(getByTestId('deleteButton'));

                expect(deleteRow).toHaveBeenCalled();
            });
        });
    });

    describe('when validating', () => {
        it('should disable save button when required field has no value', () => {
            const { getAllByTestId, getByTestId } = render(
                <SingleEditTable
                    columns={[
                        { title: 'col1', id: 'col1', type: 'text', required: true },
                        { title: 'col2', id: 'col2', type: 'text' }
                    ]}
                    rows={[
                        {
                            id: 0,
                            col1: '',
                            col2: 'text2'
                        },
                        {
                            id: 1,
                            col1: 'text3',
                            col2: 'text4'
                        }
                    ]}
                />
            );

            fireEvent.click(getAllByTestId('editButton')[0]);

            expect(getByTestId('saveButton')).toBeDisabled();
        });
    });
});
