import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PaginatedTable from '../table/PaginatedTable';
import { screen } from '@testing-library/react';
import render from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('<PaginatedTable />', () => {

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
                handleRowLinkClick: () => {},
                columns: {},
                pageOptions: {},
                setPageOptions: () => {},
                rows: [],
                page: {
                    rows: [
                        {
                            Id: 'id',
                            values: ['1', '2', '3', '4'],
                            links: {},
                            expandableInfo: {
                                Id: 'id',
                                elements: [
                                    {
                                        label: 'label',
                                        value: 'value'
                                    }
                                ]
                            }
                        }
                    ],
                    totalItemCount: 10
                },
                pageLoad: jest.fn(),
                pageSortedLoad: jest.fn(),
                columnNames: [
                    { value: 'id', label: 'id -l' },
                    { value: 'id1', label: 'id -l1' },
                    { value: 'id2', label: 'id -l2' },
                    { value: 'id3', label: 'id -l3' }
                ]
            };
            render(
                <Router>
                    <PaginatedTable {...props} />
                </Router>
            );
        });

        it('should render table data', () => {
            expect(screen.getByText('id -l')).toBeDefined();
            expect(screen.getByText('1')).toBeDefined();
            expect(screen.getByText('id -l3')).toBeDefined();
            expect(screen.getByText('4')).toBeDefined();
        });
    });
});
