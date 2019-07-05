import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import createShallow from '@material-ui/core/test-utils/createShallow';
import InfiniteTable from '../table/InfiniteTable';

describe('<InfiniteTable />', () => {
    let wrapper;
    let props;
    const getInfiniteTable = () => wrapper.find(Table);
    const getRows = () => wrapper.find(TableRow);
    const shallow = createShallow();

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
                table: {
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
                columnNames: [
                    { value: 'id', label: 'id -l' },
                    { value: 'id1', label: 'id -l1' },
                    { value: 'id2', label: 'id -l2' },
                    { value: 'id3', label: 'id -l3' }
                ]
            };
            wrapper = shallow(
                <Router>
                    <InfiniteTable {...props} />
                </Router>
            );
        });

        it('should display the table and populate the rows with the given values ', () => {
            expect(getInfiniteTable()).toBeDefined();
        });

        it('should find one row', () => {
            expect(getRows()).toBeDefined();
        });
    });
});
