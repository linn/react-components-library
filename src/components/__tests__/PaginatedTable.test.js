import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import PaginatedTable from '../table/PaginatedTable';

describe('<PaginatedTable />', () => {
    let wrapper;
    let props;
    const getPaginatedTable = () => wrapper.find('Table');
    const shallow = createShallow();

    describe('when items exist', () => {
        beforeEach(() => {
            props = {
                page: [
                    {
                        elements: [
                            {
                                Id: 'id',
                                values: ['1', '2', '3', '4'],
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
                    }
                ],
                pageLoad: jest.fn(),
                pageSortedLoad: jest.fn(),
                columnNames: ['autoComplete']
            };
            wrapper = shallow(<PaginatedTable {...props} />);
        });

        it('should ', () => {});
    });
});
