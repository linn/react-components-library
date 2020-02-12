import deepFreeze from 'deep-freeze';
import collectionWithLInksStoreFactory from '../reducerFactories/collectionWithLinksStoreFactory';

describe('collection with links store reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITIES: 'REQUEST_ENTITIES',
        RECEIVE_ENTITIES: 'RECEIVE_ENTITIES'
    };
    const defaultState = {
        loading: false,
        items: []
    };
    const generatedReducer = collectionWithLInksStoreFactory('ENTITIES', actionTypes, defaultState);

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

    test('when receiving entities', () => {
        const state = {
            loading: true,
            items: null
        };

        const action = {
            type: actionTypes.RECEIVE_ENTITIES,
            payload: {
                data: {
                    responseData: [{ name: '1', links: [{ rel: 'self', href: '/1' }] }],
                    links: [{ rel: 'self', href: '/1' }]
                }
            }
        };

        const expected = {
            loading: false,
            items: [{ name: '1', href: '/1', links: [{ rel: 'self', href: '/1' }] }],
            links: [{ rel: 'self', href: '/1' }]
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
