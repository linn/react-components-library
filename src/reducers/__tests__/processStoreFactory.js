﻿import deepFreeze from 'deep-freeze';
import processStoreFactory from '../reducerFactories/processStoreFactory';

describe('item store reducer factory', () => {
    const actionTypes = {
        REQUEST_PROCESS: 'REQUEST_PROCESS',
        RECEIVE_PROCESS: 'RECEIVE_PROCESS',
        CLEAR_PROCESS_DATA: 'CLEAR_PROCESS_DATA',
        FETCH_PROCESS_ERROR: 'FETCH_PROCESS_ERROR'
    };
    const defaultState = { working: false, messageText: '', messageVisible: false };
    const generatedReducer = processStoreFactory(
        'PROCESS',
        actionTypes,
        defaultState,
        'Completed successfully'
    );

    test('when requesting PROCESS', () => {
        const state = {
            working: false
        };

        const action = {
            type: actionTypes.REQUEST_PROCESS,
            payload: {}
        };

        const expected = {
            working: true,
            data: null
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving process', () => {
        const state = {
            messageText: null,
            messageVisible: null,
            working: true,
            data: null
        };

        const action = {
            type: actionTypes.RECEIVE_PROCESS,
            payload: { data: { name: '1' } }
        };

        const expected = {
            messageText: 'Completed successfully',
            messageVisible: true,
            working: false,
            data: { name: '1' }
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving process with message', () => {
        const state = {
            messageText: null,
            messageVisible: null,
            working: true,
            data: null
        };

        const action = {
            type: actionTypes.RECEIVE_PROCESS,
            payload: { data: { name: '1', message: 'Bespoke message' } }
        };

        const expected = {
            messageText: 'Bespoke message',
            messageVisible: true,
            working: false,
            data: { name: '1', message: 'Bespoke message' }
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when clearing process data', () => {
        const state = {
            messageText: 'message',
            messageVisible: true,
            working: false,
            data: { name: 'name' }
        };

        const action = {
            type: actionTypes.CLEAR_PROCESS_DATA,
            payload: null
        };

        const expected = {
            messageText: 'Completed successfully',
            messageVisible: false,
            working: false,
            data: null
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when process errors', () => {
        const state = {
            working: true
        };

        const action = {
            type: actionTypes.FETCH_PROCESS_ERROR,
            payload: null
        };

        const expected = {
            working: false
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
