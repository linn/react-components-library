import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import EditableTableRow from '../editableTable/EditableTableRow';

afterEach(cleanup);

describe('<EditableTableRow />', () => {
    const saveRow = jest.fn();
    const deleteRow = jest.fn();

    const columns = [
        {
            title: 'col1',
            id: 'col1',
            editable: true
        },
        {
            title: 'col2',
            id: 'col2',
            editable: false
        }
    ];

    const row = {
        id: 'row1',
        col1: 'test',
        col2: 'test2'
    };

    const defaultProps = {
        columns,
        row,
        saveRow,
        createRow: jest.fn()
    };

    describe('when viewing', () => {
        it('should render row values', () => {
            const { getByText } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} />
                    </tbody>
                </table>
            );

            const rowValue1 = getByText('test');
            const rowValue2 = getByText('test2');

            expect(rowValue1).toBeInTheDocument();
            expect(rowValue2).toBeInTheDocument();
        });

        it('should render edit button', () => {
            const { getByTestId } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} />
                    </tbody>
                </table>
            );

            const editButton = getByTestId('editButton');

            expect(editButton).toBeInTheDocument();
        });
    });

    describe('when editing', () => {
        it('should display save and cancel buttons when editing and delete prop is null', () => {
            const { getByTestId, queryByTestId } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} />
                    </tbody>
                </table>
            );

            const editButton = getByTestId('editButton');

            fireEvent.click(editButton);

            const saveButton = getByTestId('saveButton');
            const clearButton = getByTestId('clearButton');
            const deleteButton = queryByTestId('deleteButton');

            expect(saveButton).toBeInTheDocument();
            expect(clearButton).toBeInTheDocument();
            expect(deleteButton).toBeNull();
        });

        it('should call save function when save clicked', () => {
            const { getByTestId } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} />
                    </tbody>
                </table>
            );

            const editButton = getByTestId('editButton');

            fireEvent.click(editButton);

            const saveButton = getByTestId('saveButton');

            fireEvent.click(saveButton);

            expect(saveRow).toHaveBeenCalled();
        });
    });

    describe('when deleting', () => {
        it('should display save, delete and cancel buttons when editingnpm ', () => {
            const { getByTestId } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} deleteRow={deleteRow} />
                    </tbody>
                </table>
            );

            const editButton = getByTestId('editButton');

            fireEvent.click(editButton);

            const saveButton = getByTestId('saveButton');
            const clearButton = getByTestId('clearButton');
            const deleteButton = getByTestId('deleteButton');

            expect(saveButton).toBeInTheDocument();
            expect(clearButton).toBeInTheDocument();
            expect(deleteButton).toBeInTheDocument();
        });

        it('should call save function when save clicked', () => {
            const { getByTestId } = render(
                <table>
                    <tbody>
                        <EditableTableRow {...defaultProps} deleteRow={deleteRow} />
                    </tbody>
                </table>
            );

            const editButton = getByTestId('editButton');

            fireEvent.click(editButton);

            const deleteButton = getByTestId('deleteButton');

            fireEvent.click(deleteButton);

            expect(deleteRow).toHaveBeenCalled();
        });
    });
});
