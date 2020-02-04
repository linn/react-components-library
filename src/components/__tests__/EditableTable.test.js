import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import render from '../../test-utils';
import EditableTable from '../editableTable/EditableTable';

afterEach(cleanup);

describe('<EditableTable />', () => {
    const columns = [
        {
            title: 'col1',
            id: 'col1'
        },
        {
            title: 'col2',
            id: 'col2'
        }
    ];

    const rows = [
        {
            id: 'row1',
            col1: 'test',
            col2: 'test2'
        },
        {
            id: 'row2',
            col1: 'test3',
            col2: 'test4'
        }
    ];

    const defaultProps = { columns, rows };

    it('should render columns', () => {
        const { getByText } = render(<EditableTable {...defaultProps} />);

        const col1 = getByText('col1');
        const col2 = getByText('col2');

        expect(col1).toBeInTheDocument();
        expect(col2).toBeInTheDocument();
    });

    it('should render rows', () => {
        const { getByText } = render(<EditableTable {...defaultProps} />);

        const rowValue1 = getByText('test');
        const rowValue2 = getByText('test2');
        const rowValue3 = getByText('test3');
        const rowValue4 = getByText('test4');

        expect(rowValue1).toBeInTheDocument();
        expect(rowValue2).toBeInTheDocument();
        expect(rowValue3).toBeInTheDocument();
        expect(rowValue4).toBeInTheDocument();
    });

    it('should show add button when editable', () => {
        const { getByTestId } = render(<EditableTable {...defaultProps} editable />);

        const addButton = getByTestId('addButton');

        expect(addButton).toBeInTheDocument();
    });
});
