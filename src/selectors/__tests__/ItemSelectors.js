import ItemSelectors from '../ItemSelectors';

const itemSelectors = new ItemSelectors('itemType');

describe('when getting item', () => {
    test('should return item', () => {
        const state = {
            itemType: {
                item: { name: 'name' }
            }
        };

        const expectedResult = { name: 'name' };

        expect(itemSelectors.getItem(state)).toEqual(expectedResult);
    });
});

describe('when getting nothing', () => {
    test('should return empty', () => {
        const state = {
            itemType: {
                item: null
            }
        };

        expect(itemSelectors.getItem(state)).toEqual(null);
    });
});

describe('when getting loading', () => {
    test('should return true', () => {
        const state = {
            itemType: {
                item: null,
                loading: true
            }
        };

        expect(itemSelectors.getLoading(state)).toEqual(true);
    });
});

describe('when getting application state', () => {
    test('should return state', () => {
        const state = {
            itemType: {
                item: { name: 'name' },
                applicationState: { links: [{ rel: 'a', href: '/b' }] }
            }
        };

        const expectedResult = { links: [{ rel: 'a', href: '/b' }] };

        expect(itemSelectors.getApplicationState(state)).toEqual(expectedResult);
    });
});
