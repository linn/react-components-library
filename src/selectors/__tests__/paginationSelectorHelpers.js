import {
    getItems,
    getLoading,
    getItem,
    getItemByHref,
    getPage
} from '../paginationSelectorHelpers';

describe('when getting items', () => {
    test('should return items', () => {
        const state = {
            item: {
                page: {
                    elements: [{ name: 'name' }]
                }
            }
        };

        const expectedResult = [{ name: 'name' }];

        expect(getItems(state.item)).toEqual(expectedResult);
    });
});

describe('when getting loading', () => {
    test('should return true', () => {
        const state = {
            item: {
                loading: true,
                page: {
                    elements: [{ name: 'name' }]
                }
            }
        };

        expect(getLoading(state.item)).toEqual(true);
    });
});

describe('when getting item by id', () => {
    test('should return item', () => {
        const state = {
            item: {
                page: {
                    elements: [{ id: 1, name: 'name' }]
                }
            }
        };

        const expectedResult = { id: 1, name: 'name' };

        expect(getItem(state.item, 1)).toEqual(expectedResult);
    });
});

describe('when getting item by href', () => {
    test('should return item', () => {
        const state = {
            item: {
                page: {
                    elements: [{ href: '/1', name: 'name' }]
                }
            }
        };

        const expectedResult = { href: '/1', name: 'name' };

        expect(getItemByHref(state.item, '/1')).toEqual(expectedResult);
    });
});

describe('when getting page', () => {
    test('should return page', () => {
        const state = {
            item: {
                page: {
                    elements: [{ name: 'name' }]
                }
            }
        };

        const expectedResult = { elements: [{ name: 'name' }] };

        expect(getPage(state.item)).toEqual(expectedResult);
    });
});
