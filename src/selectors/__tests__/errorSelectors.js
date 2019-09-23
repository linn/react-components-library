import { getRequestErrors, getItemErrors, getItemError } from '../errorSelectors';

const requestErrors = [
    {
        SOME_ACTION_THAT_ERRORED: {
            name: 'requestError',
            message: 'Failed to fetch'
        }
    }
];

const itemErrors = [
    {
        status: 404,
        statusText: 'Error - 404 Not Found',
        details: {
            message: 'Not found'
        },
        item: 'itemA'
    },
    {
        status: 404,
        statusText: 'Error - 404 Not Found',
        details: {
            message: 'Not found'
        },
        item: 'itemB'
    }
];

describe('when requestErrors', () => {
    test('should return message', () => {
        const state = {
            errors: {
                requestErrors
            }
        };

        expect(getRequestErrors(state)).toEqual(requestErrors);
    });
});

describe('when no requestErrors', () => {
    test('should return null', () => {
        const state = {
            errors: {
                menu: 'some error'
            }
        };

        expect(getRequestErrors(state)).toEqual(null);
    });
});

describe('when itemErrors', () => {
    const state = {
        errors: {
            itemErrors
        }
    };
    test('should get all', () => {
        const result = getItemErrors(state);
        expect(result.length).toEqual(2);
        expect(result[0].item).toEqual('itemA');
    });

    test('should get by key', () => {
        const result = getItemError(state, 'itemA');
        expect(result.item).toEqual('itemA');
    });
});

describe('when  no itemErrors', () => {
    const state = {
        errors: { requestErrors: [], itemErrors: [] }
    };
    test('should return null', () => {
        expect(getItemError(state, 'itemA')).toEqual(null);
        expect(getItemErrors(state)).toEqual(null);
    });
});
