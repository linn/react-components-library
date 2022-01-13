import userSelectors from '../userSelectors';

describe('when getting name', () => {
    test('should return name', () => {
        const state = {
            oidc: {
                user: {
                    profile: {
                        name: 'user 1'
                    }
                }
            }
        };

        expect(userSelectors.getName(state)).toEqual('user 1');
    });
});

describe('when getting user number', () => {
    test('should return user number', () => {
        const state = {
            oidc: {
                user: {
                    profile: {
                        employee: '/employees/808'
                    }
                }
            }
        };

        expect(userSelectors.getUserNumber(state)).toEqual('808');
    });
});
