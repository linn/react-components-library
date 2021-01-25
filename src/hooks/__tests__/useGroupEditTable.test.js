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

describe('when setting rowToBeDeleted', () => {
    describe('when setting true', () => {
        it('should set toBeDeleted to true and editing to false', () => {
            const hookData = setup({ rows });

            act(() => {
                hookData.setRowToBeDeleted(0, true);
            });

            expect(hookData.data[0].toBeDeleted).toEqual(true);
            expect(hookData.data[0].editing).toEqual(false);
        });
    });

    describe('when setting false', () => {
        it('should set toBeDeleted to false and editing to true', () => {
            const hookData = setup({ rows });

            act(() => {
                hookData.setRowToBeDeleted(0, false);
            });

            expect(hookData.data[0].toBeDeleted).toEqual(false);
            expect(hookData.data[0].editing).toEqual(true);
        });
    });
});

describe('when marking rowToBeSaved', () => {
    describe('when setting true', () => {
        it('should set toBeSaved to true and editing to false', () => {
            const hookData = setup({ rows });

            act(() => {
                hookData.setRowToBeSaved(0, true);
            });

            expect(hookData.data[0].toBeSaved).toEqual(true);
            expect(hookData.data[0].editing).toEqual(false);
        });
    });

    describe('when setting false', () => {
        it('should set toBeSaved to false and editing to true', () => {
            const hookData = setup({ rows });

            act(() => {
                hookData.setRowToBeSaved(0, false);
            });

            expect(hookData.data[0].toBeSaved).toEqual(false);
            expect(hookData.data[0].editing).toEqual(true);
        });
    });
});

describe('when removing rows to be deleted', () => {
    it('should remove rows marked toBeDeleted', () => {
        const hookData = setup({
            rows: [
                {
                    id: 0,
                    text: 'text0'
                },
                {
                    id: 1,
                    text: 'text1',
                    toBeDeleted: true
                },
                {
                    id: 2,
                    text: 'text2',
                    toBeDeleted: true
                },
                {
                    id: 3,
                    text: 'text3'
                }
            ]
        });

        act(() => {
            hookData.removeRowsToBeDeleted();
        });

        expect(hookData.data.length).toEqual(2);
        expect(hookData.data[0].id).toEqual(0);
        expect(hookData.data[1].id).toEqual(3);
    });
});

describe('when resetting unsaved rows', () => {
    it('should return rows to their original state', () => {
        const hookData = setup({
            rows: [
                {
                    id: 0,
                    text: 'text0'
                },
                {
                    id: 1,
                    text: 'text1'
                },
                {
                    id: 2,
                    text: 'text2'
                },
                {
                    id: 3,
                    text: 'text3'
                }
            ]
        });

        act(() => {
            hookData.updateRow(hookData.data[1], null, 'text', 'new text');
        });
        act(() => {
            hookData.updateRow(hookData.data[2], null, 'text', 'more new text');
        });

        expect(hookData.data.find(d => d.id === 1).text).toEqual('new text');
        expect(hookData.data.find(d => d.id === 2).text).toEqual('more new text');

        act(() => {
            hookData.resetUnsavedRows();
        });

        expect(hookData.data.find(d => d.id === 1).text).toEqual('text1');
        expect(hookData.data.find(d => d.id === 2).text).toEqual('text2');
    });
});
