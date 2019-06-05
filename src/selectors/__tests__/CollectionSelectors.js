import CollectionSelectors from '../CollectionSelectors';

const collectionSelectors = new CollectionSelectors('itemTypes');

describe('when getting items', () => {
    test('should return items', () => {
        const state = {
            itemTypes: {
                items: [{ name: 'name' }]
            }
        };

        const expectedResult = [{ name: 'name' }];

        expect(collectionSelectors.getItems(state)).toEqual(expectedResult);
    });
});

describe('when getting nothing', () => {
    test('should return empty', () => {
        const state = {
            itemTypes: {
                items: null
            }
        };

        expect(collectionSelectors.getItems(state)).toEqual([]);
    });
});

describe('when getting loading', () => {
    test('should return true', () => {
        const state = {
            itemTypes: {
                items: null,
                loading: true
            }
        };

        expect(collectionSelectors.getLoading(state)).toEqual(true);
    });
});

describe('when getting item by id', () => {
    test('should return item', () => {
        const state = {
            itemTypes: {
                items: [{ id: '1' }, { id: '2' }],
                loading: false
            }
        };

        const expectedResult = { id: '1' };

        expect(collectionSelectors.getItem(state, '1')).toEqual(expectedResult);
    });
});

describe('when getting item by href', () => {
    test('should return item', () => {
        const state = {
            itemTypes: {
                items: [{ name: '1', href: '/1' }, { name: '2', href: '/2' }],
                loading: false
            }
        };

        const expectedResult = { name: '1', href: '/1' };

        expect(collectionSelectors.getItemByHref(state, '/1')).toEqual(expectedResult);
    });
});

describe('when getting links', () => {
    test('should return true', () => {
        const state = {
            itemTypes: {
                items: null,
                links: [{ rel: 'self', href: '/1' }]
            }
        };

        const expectedResult = [{ rel: 'self', href: '/1' }];

        expect(collectionSelectors.getLinks(state)).toEqual(expectedResult);
    });
});