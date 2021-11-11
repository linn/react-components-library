import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PaginatedTable from '../table/PaginatedTable';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

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
                pageSortedLoad: jest.fn(),
            };


            render(
                <Router>
                    <PaginatedTable {...props} />
                </Router>
            );
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
