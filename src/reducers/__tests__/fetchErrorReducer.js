import deepFreeze from 'deep-freeze';
import fetchErrorReducer from '../fetchErrorReducer';

describe('fetch error reducer', () => {
    test('when a fetch error occurs', () => {
        const state = {
            something: {
                status: 500,
                statusText: '500 - Internal Server Error',
                details: { message: 'ISE' },
                item: 'something'
            }
        };
        const action = {
            type: 'SOMETHING_FETCH_ERROR',
            payload: {
                error: {
                    item: 'somethingElse',
                    status: 404,
                    statusText: '400 - NOT fOUND',
                    details: { message: 'not found' }
                }
            }
        };

        const expected = {
            something: {
                status: 500,
                statusText: '500 - Internal Server Error',
                details: { message: 'ISE' },
                item: 'something'
            },
            somethingElse: {
                status: 404,
                statusText: '400 - NOT fOUND',
                details: { message: 'not found' },
                item: 'somethingElse'
            }
        };

        deepFreeze(state);

        expect(fetchErrorReducer(state, action)).toEqual(expected);
    });
});
