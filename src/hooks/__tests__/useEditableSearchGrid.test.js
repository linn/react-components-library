import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { fireEvent, waitFor, cleanup, screen, within } from '@testing-library/react';
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

    // Regression: Enter must open the dialog WITHOUT the grid starting edit mode on the cell behind it.
    // If it did, picking a result wrote the code to the row but the stale empty editor committed on the
    // next Tab and wiped it back out (the "name filled, code blank" bug).
    test('Enter opens the search dialog and picking a result fills the code without wiping it', async () => {
        const onRowChange = jest.fn();
        const SearchHost = () => {
            const [rows, setRows] = useState([
                { id: 1, departmentCode: '', departmentName: '', amount: 0 }
            ]);
            const columns = [
                {
                    field: 'departmentCode',
                    headerName: 'Department',
                    type: 'search',
                    width: 140,
                    pad: 10,
                    search: () => {},
                    searchResults: [{ departmentCode: '0000007769', description: 'ASSEMBLY' }],
                    resultIdField: 'departmentCode',
                    updateFields: [{ field: 'departmentName', from: 'description' }]
                },
                { field: 'departmentName', headerName: 'Name', width: 140 },
                { field: 'amount', headerName: 'Amount', width: 100 }
            ];
            const search = useEditableSearchGrid({ rows, setRows, columns, onRowChange });
            return (
                <>
                    <DataGrid
                        apiRef={search.apiRef}
                        rows={rows}
                        columns={search.columns}
                        onCellKeyDown={search.handleCellKeyDown}
                        processRowUpdate={search.processRowUpdate}
                        hideFooter
                    />
                    {search.searchDialogs}
                </>
            );
        };

        const { container } = render(<SearchHost />);
        const deptCell = cell(container, 'departmentCode');
        fireEvent.click(deptCell);
        fireEvent.keyDown(deptCell, { key: 'Enter', code: 'Enter', keyCode: 13 });

        // The cell must NOT have gone into edit mode behind the dialog (no editor input in the cell).
        expect(cell(container, 'departmentCode').querySelector('input')).toBeNull();

        // Run the search (Enter in the box reveals the results), then pick the result; the code is
        // written to the row and reported to the consumer.
        const dialog = await screen.findByRole('dialog');
        const searchBox = within(dialog).getByRole('textbox');
        fireEvent.change(searchBox, { target: { value: 'ass' } });
        fireEvent.keyDown(searchBox, { key: 'Enter', code: 'Enter', keyCode: 13 });
        fireEvent.click(await screen.findByText('ASSEMBLY'));

        await waitFor(() => expect(onRowChange).toHaveBeenCalled());
        const [updatedRow, , changedField] = onRowChange.mock.calls.at(-1);
        expect(updatedRow.departmentCode).toBe('0000007769');
        expect(updatedRow.departmentName).toBe('ASSEMBLY');
        expect(changedField).toBe('departmentCode');

        // Once the dialog has fully closed, focus returns to the originating cell (via the dialog's
        // transition onExited) so Tab continues to the next cell in the row rather than the page
        // dropping focus to the top.
        await waitFor(() => expect(cell(container, 'departmentCode')).toHaveFocus());
    });
});
