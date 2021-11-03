import deepFreeze from 'deep-freeze';
import collectionStoreFactory from '../reducerFactories/collectionStoreFactory';

describe('collection store reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITIES: 'REQUEST_ENTITIES',
        RECEIVE_ENTITIES: 'RECEIVE_ENTITIES',
        REQUEST_APPLICATION_STATE_ENTITIES: 'REQUEST_APPLICATION_STATE_ENTITIES',
        RECEIVE_APPLICATION_STATE_ENTITIES: 'RECEIVE_APPLICATION_STATE_ENTITIES',
        CLEAR_ENTITIES_DATA: 'CLEAR_ENTITIES_DATA'
    };
    const defaultState = {
        loading: false,
        items: []
    };
    const generatedReducer = collectionStoreFactory('ENTITIES', actionTypes, defaultState);

    test('when requesting entities', () => {
        const state = {
            loading: false
        };

        const action = {
            type: actionTypes.REQUEST_ENTITIES,
            payload: {}
        };

        const expected = {
            loading: true
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
            type: actionTypes.REQUEST_APPLICATION_STATE_ENTITIES,
            payload: {}
        };

        const expected = {
            loading: false,
            applicationState: { loading: true }
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving entities', () => {
        const state = {
            loading: true,
            items: null
        };

        const action = {
            type: actionTypes.RECEIVE_ENTITIES,
            payload: { data: [{ name: '1', links: [{ rel: 'self', href: '/1' }] }] }
        };

        const expected = {
            loading: false,
            items: [{ name: '1', href: '/1', links: [{ rel: 'self', href: '/1' }] }]
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when clearing data', () => {
        const state = {
            loading: true,
            items: null
        };

        const action = {
            type: actionTypes.CLEAR_ENTITIES_DATA,
            payload: {}
        };

        const expected = defaultState;

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving application state', () => {
        const state = {
            loading: false,
            items: null
        };

        const action = {
            type: actionTypes.RECEIVE_APPLICATION_STATE_ENTITIES,
            payload: { data: { links: [{ rel: 'create', href: '/create' }] } }
        };

        const expected = {
            loading: false,
            items: null,
            applicationState: { links: [{ rel: 'create', href: '/create' }], loading: false }
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
