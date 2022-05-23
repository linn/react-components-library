import deepFreeze from 'deep-freeze';
import itemStoreFactory from '../reducerFactories/itemStoreFactory';

describe('item store reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITY: 'REQUEST_ENTITY',
        RESET_ENTITY: 'RESET_ENTITY',
        REQUEST_UPDATE_ENTITY: 'REQUEST_UPDATE_ENTITY',
        REQUEST_ADD_ENTITY: 'REQUEST_ADD_ENTITY',
        RECEIVE_ENTITY: 'RECEIVE_ENTITY',
        RECEIVE_NEW_ENTITY: 'RECEIVE_NEW_ENTITY',
        REQUEST_APPLICATION_STATE_ENTITY: 'REQUEST_APPLICATION_STATE_ENTITY',
        RECEIVE_APPLICATION_STATE_ENTITY: 'RECEIVE_APPLICATION_STATE_ENTITY',
        CLEAR_ENTITY_DATA: 'CLEAR_ENTITY_DATA',
        REQUEST_POST_ENTITY: 'REQUEST_POST_ENTITY',
        RECEIVE_POST_ENTITY: 'RECEIVE_POST_ENTITY',
        REQUEST_PATCH_ENTITY: 'REQUEST_PATCH_ENTITY',
        RECEIVE_PATCH_ENTITY: 'RECEIVE_PATCH_ENTITY',
        SHOW_ENTITY_SNACKBAR: 'SHOW_ENTITY_SNACKBAR',
        HIDE_ENTITY_SNACKBAR: 'HIDE_ENTITY_SNACKBAR'
    };
    const defaultState = {
        loading: false,
        item: null,
        editStatus: 'view',
        snackbarVisible: false
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

    test('when requesting application state', () => {
        const state = {
            loading: false,
            applicationState: { links: [] }
        };

        const action = {
            type: actionTypes.REQUEST_APPLICATION_STATE_ENTITY,
            payload: {}
        };

        const expected = {
            loading: false,
            applicationState: { loading: true }
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

    test('when receiving application state', () => {
        const state = {
            loading: false,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_APPLICATION_STATE_ENTITY,
            payload: { data: { links: [{ rel: 'create', href: '/create' }] } }
        };

        const expected = {
            loading: false,
            item: null,
            applicationState: { links: [{ rel: 'create', href: '/create' }], loading: false }
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

    test('when clearing entity', () => {
        const state = {
            loading: false,
            item: { name: 'name' },
            snackbarVisible: true
        };

        const action = {
            type: actionTypes.CLEAR_ENTITY_DATA,
            payload: {}
        };

        const expected = defaultState;

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when requesting POST entity', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_POST_ENTITY,
            payload: {}
        };

        const expected = {
            loading: true
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving entity from post', () => {
        const state = {
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_POST_ENTITY,
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

    test('when requesting PATCH entity', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_PATCH_ENTITY,
            payload: {}
        };

        const expected = {
            loading: true
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving entity from patch', () => {
        const state = {
            loading: true,
            item: null
        };

        const action = {
            type: actionTypes.RECEIVE_PATCH_ENTITY,
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

    test('when showing snackbar', () => {
        const state = {
            ...defaultState,
            snackbarVisible: false
        };

        const action = {
            type: actionTypes.SHOW_ENTITY_SNACKBAR,
            payload: {}
        };

        const expected = {
            ...defaultState,
            snackbarVisible: true
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when hiding snackbar', () => {
        const state = {
            ...defaultState,
            snackbarVisible: true
        };

        const action = {
            type: actionTypes.HIDE_ENTITY_SNACKBAR,
            payload: {}
        };

        const expected = {
            ...defaultState,
            snackbarVisible: false
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
