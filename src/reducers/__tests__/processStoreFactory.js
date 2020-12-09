import deepFreeze from 'deep-freeze';
import processStoreFactory from '../reducerFactories/processStoreFactory';

describe('item store reducer factory', () => {
    const actionTypes = {
        REQUEST_PROCESS: 'REQUEST_PROCESS',
        RECEIVE_PROCESS: 'RECEIVE_PROCESS'
    };
    const defaultState = { working: false, messageText: '', messageVisible: false };
    const generatedReducer = processStoreFactory('PROCESS', actionTypes, defaultState, 'Completed successfully');

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

    test('when receiving PROCESS', () => {
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
            messageText: "Completed successfully",
            messageVisible: true,
            working: false,
            data: { name: '1' }
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
