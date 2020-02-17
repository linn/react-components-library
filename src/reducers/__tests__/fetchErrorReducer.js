import deepFreeze from 'deep-freeze';
import fetchErrorReducerFactory from '../reducerFactories/fetchErrorReducerFactory';
import * as actionTypes from '../../actions';

const itemTypes = {
    itemOne: {
        actionType: 'ITEM_ONE'
    }
};

describe('when a fetch error action is dispatched', () => {
    test('error is added to itemError array in store', () => {
        const state = { itemErrors: [], requestErrors: [] };

        const action = {
            type: 'FETCH_ITEM_ONE_ERROR',
            payload: {
                error: {
                    item: 'itemOne',
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' }
                }
            }
        };

        const expected = {
            itemErrors: [
                {
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' },
                    item: 'itemOne'
                }
            ],
            requestErrors: []
        };

        deepFreeze(state);
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});

describe('when a request action errors', () => {
    test('error is added to requestError array in store', () => {
        const state = { itemErrors: [], requestErrors: [] };

        const action = {
            type: 'REQUEST_ITEM',
            error: true,
            payload: { name: 'RequestError', message: 'Failed to fetch' }
        };

        const expected = {
            itemErrors: [],
            requestErrors: [
                { name: 'RequestError', message: 'Failed to fetch', type: 'REQUEST_ITEM' }
            ]
        };

        deepFreeze(state);
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});

describe('when a previously errored request action succeeds', () => {
    test('error should be removed from requestErrors', () => {
        const state = {
            itemErrors: [],
            requestErrors: [
                { name: 'RequestError', message: 'Failed to fetch', type: 'REQUEST_ITEM' }
            ]
        };

        const action = {
            type: 'REQUEST_ITEM',
            payload: { data: 'something' }
        };

        const expected = {
            itemErrors: [],
            requestErrors: []
        };

        deepFreeze(state);
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});

describe('when a clear item errors action is dispatched', () => {
    test('errors for that item are removed from the error array in store', () => {
        const state = {
            itemErrors: [
                {
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' },
                    item: 'itemOne'
                }
            ],
            requestErrors: []
        };
        const action = {
            type: 'CLEAR_ITEM_ONE_ERRORS',
            payload: { item: 'itemOne' }
        };
        deepFreeze(state);
        const expected = { itemErrors: [], requestErrors: [] };
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});

describe('when clear all item errors action dispatched', () => {
    test('itemError array is cleared', () => {
        const state = {
            itemErrors: [
                {
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' },
                    item: 'itemOne'
                },
                {
                    status: 500,
                    statusText: '500 - INTERNAL SERVER ERROR',
                    details: { message: 'not found' },
                    item: 'itemTwo'
                }
            ],
            requestErrors: []
        };
        const action = {
            type: actionTypes.CLEAR_ITEM_ERRORS
        };
        deepFreeze(state);
        const expected = { itemErrors: [], requestErrors: [] };
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});

describe('when a succseful receive action is dispatched for an item that previously errored', () => {
    test('errors for that item are removed from the error array in store', () => {
        const state = {
            itemErrors: [
                {
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' },
                    item: 'itemOne'
                }
            ],
            requestErrors: []
        };
        const action = {
            type: 'RECEIVE_ITEM_ONE',
            payload: { item: 'itemOne', data: { id: 1 } }
        };
        deepFreeze(state);
        const expected = { itemErrors: [], requestErrors: [] };
        const generatedReducer = fetchErrorReducerFactory(itemTypes, state, action);
        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
