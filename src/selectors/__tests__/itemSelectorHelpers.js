import itemSelectorHelpers from '../itemSelectorHelpers';

describe('when getting item', () => {
    test('should return item', () => {
        const state = {
            itemType: {
                item: { name: 'name' }
            }
        };

        const expectedResult = { name: 'name' };

        expect(itemSelectorHelpers.getItem(state.itemType)).toEqual(expectedResult);
    });
});

describe('when getting nothing', () => {
    test('should return empty', () => {
        const state = {
            itemType: {
                item: null
            }
        };

        expect(itemSelectorHelpers.getItem(state.itemType)).toEqual(null);
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

        expect(itemSelectorHelpers.getItemLoading(state.itemType)).toEqual(true);
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

        expect(itemSelectorHelpers.getApplicationState(state.itemType)).toEqual(expectedResult);
    });
});

describe('when getting application state loading', () => {
    test('should return loading state', () => {
        const state = {
            itemType: {
                item: { name: 'name' },
                applicationState: { loading: true, links: [{ rel: 'a', href: '/b' }] }
            }
        };

        const expectedResult = true;

        expect(itemSelectorHelpers.getApplicationStateLoading(state.itemType)).toEqual(
            expectedResult
        );
    });
});

describe('when getting snackbar visible', () => {
    test('should return result', () => {
        const state = {
            itemType: {
                snackbarVisible: true,
                item: { name: 'name' }
            }
        };

        const expectedResult = true;

        expect(itemSelectorHelpers.getSnackbarVisible(state.itemType)).toEqual(expectedResult);
    });
});

describe('when getting edit status', () => {
    test('should return edit status', () => {
        const state = {
            itemType: {
                editStatus: 'view',
                item: { name: 'name' }
            }
        };

        const expectedResult = 'view';

        expect(itemSelectorHelpers.getItemEditStatus(state.itemType)).toEqual(expectedResult);
    });
});
