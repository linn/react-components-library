import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import createShallow from '@material-ui/core/test-utils/createShallow';
import PaginatedTable from '../table/PaginatedTable';

describe('<PaginatedTable />', () => {
    let wrapper;
    let props;
    const getPaginatedTable = () => wrapper.find(Table);
    const getRows = () => wrapper.find(TableRow);
    const shallow = createShallow();

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
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
            wrapper = shallow(
                <Router>
                    <PaginatedTable {...props} />
                </Router>
            );
        });

        it('should create a paginated table', () => {
            expect(getPaginatedTable()).toBeDefined();
        });

        it('should find one row', () => {
            expect(getRows()).toBeDefined();
        });
    });
});
