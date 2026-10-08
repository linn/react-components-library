import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { fireEvent, waitFor, cleanup } from '@testing-library/react';
import { DataGrid } from '@mui/x-data-grid';
import render from '../../test-utils';
import useEditableSearchGrid from '../useEditableSearchGrid';

afterEach(cleanup);

// A representative consumer: it owns its own <DataGrid> and just spreads the hook's pieces onto it,
// exactly as a real screen would.
const Host = ({ onRowChange }) => {
    const [rows, setRows] = useState([
        { id: 1, departmentCode: '0000002508', nominalCode: '0000009385', amount: 12 }
    ]);
    const columns = [
        { field: 'departmentCode', headerName: 'Department', type: 'search', width: 120, pad: 10 },
        { field: 'nominalCode', headerName: 'Nominal', type: 'search', width: 120, pad: 10 },
        { field: 'amount', headerName: 'Amount', width: 100 }
    ];
    const groupValidations = [
        {
            fields: ['departmentCode', 'nominalCode'],
            isValid: row => row.nominalAccountExists !== false
        }
    ];
    const search = useEditableSearchGrid({ rows, setRows, columns, onRowChange, groupValidations });

    return (
        <>
            <DataGrid
                apiRef={search.apiRef}
                rows={rows}
                columns={search.columns}
                onCellKeyDown={search.handleCellKeyDown}
                processRowUpdate={search.processRowUpdate}
                sx={search.gridSx}
                density="compact"
                hideFooter
            />
            {search.searchDialogs}
        </>
    );
};

const cell = (container, field) =>
    container.querySelector(`.MuiDataGrid-cell[data-field="${field}"]`);

describe('useEditableSearchGrid', () => {
    test('decorates search columns and colours a failing group', () => {
        const Fail = () => {
            const [rows, setRows] = useState([
                {
                    id: 1,
                    departmentCode: '0000002508',
                    nominalCode: '0000009385',
                    amount: 12,
                    nominalAccountExists: false
                }
            ]);
            const columns = [
                { field: 'departmentCode', headerName: 'Department', type: 'search', width: 120 },
                { field: 'nominalCode', headerName: 'Nominal', type: 'search', width: 120 },
                { field: 'amount', headerName: 'Amount', width: 100 }
            ];
            const search = useEditableSearchGrid({
                rows,
                setRows,
                columns,
                groupValidations: [
                    {
                        fields: ['departmentCode', 'nominalCode'],
                        isValid: row => row.nominalAccountExists !== false
                    }
                ]
            });
            return (
                <DataGrid
                    apiRef={search.apiRef}
                    rows={rows}
                    columns={search.columns}
                    sx={search.gridSx}
                    hideFooter
                />
            );
        };

        const { container } = render(<Fail />);
        expect(container.querySelectorAll('.invalidCode').length).toBe(2);
    });

    test('commits a typed code on Tab: pads it, calls onRowChange, and moves focus on', async () => {
        const onRowChange = jest.fn();
        const { container } = render(<Host onRowChange={onRowChange} />);

        fireEvent.doubleClick(cell(container, 'departmentCode'));
        const input = cell(container, 'departmentCode').querySelector('input');
        fireEvent.change(input, { target: { value: '7769' } });
        fireEvent.keyDown(input, { key: 'Tab', code: 'Tab', keyCode: 9 });

        await waitFor(() => expect(onRowChange).toHaveBeenCalled());

        const [updatedRow, , changedField] = onRowChange.mock.calls[0];
        expect(updatedRow.departmentCode).toBe('0000007769');
        expect(changedField).toBe('departmentCode');

        await waitFor(() =>
            expect(cell(container, 'nominalCode')).toHaveAttribute('tabindex', '0')
        );
    });
});
