﻿import deepFreeze from 'deep-freeze';
import reportsResultsFactory from '../reducerFactories/reportsResultsFactory';

describe('reports results reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITIES_REPORT: 'REQUEST_ENTITIES_REPORT',
        RECEIVE_ENTITIES_REPORT: 'RECEIVE_ENTITIES_REPORT'
    };
    const defaultState = { loading: false, data: null };

    const generatedReducer = reportsResultsFactory('ENTITIES_REPORT', actionTypes, defaultState);

    test('when requesting report', () => {
        const state = {
            loading: false,
            data: {}
        };

        const action = {
            type: actionTypes.REQUEST_ENTITIES_REPORT,
            payload: {}
        };

        const expected = {
            loading: true,
            data: null
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });

    test('when receiving report', () => {
        const state = {
            loading: true
        };

        const action = {
            type: actionTypes.RECEIVE_ENTITIES_REPORT,
            payload: {
                data: { reportResults: [{ thing: 'this' }] }
            }
        };

        const expected = {
            loading: false,
            data: [{ thing: 'this' }]
        };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
