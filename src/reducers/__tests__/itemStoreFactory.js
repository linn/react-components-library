import deepFreeze from 'deep-freeze';
import itemStoreFactory from '../reducerFactories/itemStoreFactory';

describe('item store reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITY: 'REQUEST_ENTITY',
        RESET_ENTITY: 'RESET_ENTITY',
        REQUEST_UPDATE_ENTITY: 'REQUEST_UPDATE_ENTITY',
        REQUEST_ADD_ENTITY: 'REQUEST_ADD_ENTITY',
        RECEIVE_ENTITY: 'RECEIVE_ENTITY',
        RECEIVE_NEW_ENTITY: 'RECEIVE_NEW_ENTITY'
    };
    const defaultState = {
        loading: false,
        item: null,
        editStatus: 'view'
    };
    const generatedReducer = itemStoreFactory('ENTITY', actionTypes, defaultState);

    test('when requesting entity', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_ENTITY,
            payload: {}
        };

        const expected = {
            loading: true,
            item: null,
            editStatus: 'view'
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when resetting entity', () => {
        const state = {
            loading: false,
            item: { name: 'name' }
        };

        const action = {
            type: actionTypes.RESET_ENTITY,
            payload: {}
        };

        const expected = {
            loading: false,
            item: { name: 'name' },
            editStatus: 'view'
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when requesting update entity', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_UPDATE_ENTITY,
            payload: {}
        };

        const expected = {
            loading: true
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when requesting add entity', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_ADD_ENTITY,
            payload: {}
        };

        const expected = {
            loading: true,
            editStatus: 'create'
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving entity', () => {
        const state = {
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_ENTITY,
            payload: { data: { name: '1' } }
        };

        const expected = {
            loading: false,
            item: { name: '1' },
            editStatus: 'view'
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving new entity', () => {
        const state = {
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_NEW_ENTITY,
            payload: { data: { name: '1' } }
        };

        const expected = {
            loading: false,
            item: { name: '1' },
            editStatus: 'view',
            snackbarVisible: true
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
