import { getName, getUserNumber } from '../userSelectors';

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

        expect(getName(state)).toEqual('user 1');
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

        expect(getUserNumber(state)).toEqual('808');
    });
});
