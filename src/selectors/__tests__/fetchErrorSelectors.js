import getSingleErrorMessage from '../fetchErrorSelectors';

describe('when getting several error messages', () => {
    test('should return message', () => {
        const state = {
            fetchError: {
                status: 400,
                statusText: 'Bad',
                errors: [
                    {
                        errorMessage: 'The property should have such and such',
                        propertyName: 'name'
                    },
                    { errorMessage: 'The property should have such and such', propertyName: 'name' }
                ]
            }
        };

        const expectedResult =
            'The property should have such and such, The property should have such and such';

        expect(getSingleErrorMessage(state)).toEqual(expectedResult);
    });
});

describe('when getting a single validation error messages', () => {
    test('should return message', () => {
        const state = {
            fetchError: {
                status: 400,
                statusText: 'Bad',
                errors: [
                    {
                        errorMessage: 'The property should have such and such',
                        propertyName: 'name'
                    }
                ]
            }
        };

        const expectedResult = 'The property should have such and such';

        expect(getSingleErrorMessage(state)).toEqual(expectedResult);
    });
});

describe('when getting single error message', () => {
    test('should return message', () => {
        const state = {
            fetchError: {
                status: 400,
                statusText: 'Bad',
                errors: ['error1', 'error2']
            }
        };

        const expectedResult = 'error1';

        expect(getSingleErrorMessage(state)).toEqual(expectedResult);
    });
});

describe('when getting cut down error message', () => {
    test('should return status message', () => {
        const state = {
            fetchError: {
                statusText: 'Failure'
            }
        };

        const expectedResult = 'Failure';

        expect(getSingleErrorMessage(state)).toEqual(expectedResult);
    });
});

describe('when getting no message', () => {
    test('should return null', () => {
        const state = { fetchError: null };

        expect(getSingleErrorMessage(state)).toEqual(null);
    });
});
