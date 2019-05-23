import deepFreeze from 'deep-freeze';
import reportOptionsFactory from '../reducerFactories/reportOptionsFactory';

describe('reports options reducer factory', () => {
    const actionTypes = {
        REQUEST_ENTITIES_REPORT: 'REQUEST_ENTITIES_REPORT'
    };
    const defaultState = {};

    const generatedReducer = reportOptionsFactory('ENTITIES', actionTypes, defaultState);

    test('when requesting report', () => {
        const state = {};

        const action = {
            type: actionTypes.REQUEST_ENTITIES_REPORT,
            payload: {
                options: { thing: 'option' }
            }
        };

        const expected = { thing: 'option' };

        deepFreeze(state);

        expect(generatedReducer(state, action)).toEqual(expected);
    });
});
