import deepFreeze from 'deep-freeze';
import fetchError from '../fetchErrorReducer';
import * as actionTypes from '../../actions';

describe('fetch error reducer', () => {
    test('when full error received', () => {
        const state = null;

        const action = {
            type: actionTypes.FETCH_ERROR,
            payload: {
                error: {
                    status: 400,
                    statusText: '400 Bad Request',
                    details: { errors: ['Error 1', 'Error 2'] }
                }
            }
        };

        const expected = {
            status: 400,
            statusText: '400 Bad Request',
            errors: ['Error 1', 'Error 2']
        };

        expect(fetchError(state, action)).toEqual(expected);
    });

    test('when other action received', () => {
        const state = {
            status: 400,
            statusText: '400 Bad Request',
            errors: ['Error 1', 'Error 2']
        };

        const action = {
            type: 'REQUEST_ADD_CARTON_TYPE',
            payload: {}
        };

        deepFreeze(state);

        const expected = null;

        expect(fetchError(state, action)).toEqual(expected);
    });

    test('when partial error received', () => {
        const state = null;

        const action = {
            type: actionTypes.FETCH_ERROR,
            payload: 'Network failure'
        };

        const expected = {
            statusText: 'Network failure'
        };

        expect(fetchError(state, action)).toEqual(expected);
    });

    test('when request fails', () => {
        const state = null;

        const action = {
            error: true,
            type: 'SOME_RANDOM_REQUEST'
        };

        const expected = {
            statusText: 'There was an issue contacting the server, please try again later...'
        };

        expect(fetchError(state, action)).toEqual(expected);
    });
});
