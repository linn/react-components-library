import React from 'react';
import { render, act } from '@testing-library/react';
import useGroupEditTable from '../useGroupEditTable';

const rows = [
    {
        id: 0,
        text: 'text0'
    },
    {
        id: 1,
        text: 'text1'
    }
];

function setup(...args) {
    const returnVal = {};

    function TestComponent() {
        Object.assign(returnVal, useGroupEditTable(...args));
        return null;
    }

    render(<TestComponent />);

    return returnVal;
}

describe('when removing rows', () => {
    it('should remove row with matching id', () => {
        const hookData = setup({ rows });

        expect(hookData.data).toHaveLength(2);

        act(() => {
            hookData.removeRow(1);
        });

        expect(hookData.data).toHaveLength(1);
        expect(hookData.data.find(d => d.id === 0)).toBeTruthy();
        expect(hookData.data.find(d => d.id === 1)).toBeUndefined();
    });
});

describe('when adding rows', () => {
    describe('when adding without default row', () => {
        it('should add row and set id', () => {
            const hookData = setup({ rows });

            expect(hookData.data).toHaveLength(2);

            act(() => {
                hookData.addRow();
            });

            expect(hookData.data).toHaveLength(3);
            expect(hookData.data[hookData.data.length - 1].id).toBeTruthy();
            expect(hookData.data[hookData.data.length - 1].text).toBeUndefined();
        });
    });

    describe('when adding row with a default row', () => {
        it('should add default row', () => {
            const hookData = setup({
                rows,
                defaultRow: {
                    id: 123,
                    text: 'new row'
                }
            });

            expect(hookData.data).toHaveLength(2);

            act(() => {
                hookData.addRow();
            });

            expect(hookData.data).toHaveLength(3);
            expect(hookData.data[hookData.data.length - 1].id).toEqual(123);
            expect(hookData.data[hookData.data.length - 1].text).toEqual('new row');
        });
    });
});

describe('when updating row', () => {
    it('should update row with matching id', () => {
        const hookData = setup({ rows });

        expect(hookData.data).toHaveLength(2);

        act(() => {
            hookData.updateRow(hookData.data[0], null, 'text', 'new text');
        });

        expect(hookData.data).toHaveLength(2);
        expect(hookData.data.find(d => d.id === 0).text).toEqual('new text');
    });
});

describe('when resetting row', () => {
    it('should return row to its original state', () => {
        const hookData = setup({ rows });

        expect(hookData.data).toHaveLength(2);

        act(() => {
            hookData.updateRow(hookData.data[0], null, 'text', 'new text');
        });

        expect(hookData.data).toHaveLength(2);
        expect(hookData.data.find(d => d.id === 0).text).toEqual('new text');

        act(() => {
            hookData.resetRow(hookData.data.find(d => d.id === 0));
        });

        expect(hookData.data.find(d => d.id === 0).text).toEqual('text0');
    });
});

describe('when editing row', () => {
    it('should set row editing', () => {
        const hookData = setup({ rows });

        expect(hookData.data).toHaveLength(2);

        act(() => {
            hookData.setEditing(0, true);
        });

        expect(hookData.data.find(d => d.id === 0).editing).toEqual(true);
    });
});

describe('when validating table', () => {
    it('should return valid value', () => {
        const hookData = setup({ rows });

        expect(hookData.data).toHaveLength(2);

        act(() => {
            hookData.setTableValid(true);
        });

        expect(hookData.valid).toEqual(true);
    });
});
