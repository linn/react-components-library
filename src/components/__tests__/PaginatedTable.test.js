import React from 'react';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import PaginatedTable from '../table/PaginatedTable';

describe('<PaginatedTable />', () => {
    describe('when items exist', () => {
        beforeEach(() => {
            const props = {
                handleRowLinkClick: () => {},
                columns: { value: 'Le Values', label: 'The hings label' },
                pageOptions: {},
                setPageOptions: () => {},
                rows: [
                    {
                        id: 'id1',
                        value: 'potato',
                        label: 'hing is potato'
                    },
                    {
                        id: 'id2',
                        value: 'chips',
                        label: 'hing is chips'
                    }
                ],
                pageLoad: jest.fn(),
                pageSortedLoad: jest.fn()
            };

            render(<PaginatedTable {...props} />);
        });

        it('should render table columns text', () => {
            expect(screen.getByText('Le Values')).toBeInTheDocument();
            expect(screen.getByText('The hings label')).toBeInTheDocument();
        });

        it('should render table data for two rows', () => {
            expect(screen.getByText('potato')).toBeInTheDocument();
            expect(screen.getByText('chips')).toBeInTheDocument();
            expect(screen.getByText('hing is potato')).toBeInTheDocument();
            expect(screen.getByText('hing is chips')).toBeInTheDocument();
        });
    });
});
