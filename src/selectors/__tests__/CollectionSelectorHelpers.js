import { getItems } from '../CollectionSelectorHelpers';

describe('when getting items', () => {
    test('should return items', () => {
        const state = {
            itemTypes: {
                items: [{ name: 'name' }]
            }
        };

        const expectedResult = [{ name: 'name' }];

        expect(getItems(state.itemTypes)).toEqual(expectedResult);
    });
});

// describe('when getting searchItems', () => {
//     test('should return search items', () => {
//         const state = {
//             itemTypes: {
//                 searchItems: [
//                     { name: 'name' },
//                     { name: 'name' },
//                     { name: 'name' },
//                     { name: 'name' }
//                 ]
//             }
//         };

//         const expectedResult = [
//             { name: 'name' },
//             { name: 'name' },
//             { name: 'name' },
//             { name: 'name' }
//         ];

//         expect(collectionSelectors.getSearchItems(state)).toEqual(expectedResult);
//     });

//     test('should limit search items', () => {
//         const state = {
//             itemTypes: {
//                 searchItems: [
//                     { name: 'name' },
//                     { name: 'name' },
//                     { name: 'name' },
//                     { name: 'name' }
//                 ]
//             }
//         };

//         const expectedResult = [{ name: 'name' }, { name: 'name' }, { name: 'name' }];

//         expect(collectionSelectors.getSearchItems(state, 3)).toEqual(expectedResult);
//     });
// });

// describe('when getting nothing', () => {
//     test('should return empty', () => {
//         const state = {
//             itemTypes: {
//                 items: null
//             }
//         };

//         expect(collectionSelectors.getItems(state)).toEqual([]);
//     });
// });

// describe('when getting loading', () => {
//     test('should return true', () => {
//         const state = {
//             itemTypes: {
//                 items: null,
//                 loading: true
//             }
//         };

//         expect(collectionSelectors.getLoading(state)).toEqual(true);
//     });
// });

// describe('when getting item by id', () => {
//     test('should return item', () => {
//         const state = {
//             itemTypes: {
//                 items: [{ id: '1' }, { id: '2' }],
//                 loading: false
//             }
//         };

//         const expectedResult = { id: '1' };

//         expect(collectionSelectors.getItem(state, '1')).toEqual(expectedResult);
//     });
// });

// describe('when getting item by href', () => {
//     test('should return item', () => {
//         const state = {
//             itemTypes: {
//                 items: [
//                     { name: '1', href: '/1' },
//                     { name: '2', href: '/2' }
//                 ],
//                 loading: false
//             }
//         };

//         const expectedResult = { name: '1', href: '/1' };

//         expect(collectionSelectors.getItemByHref(state, '/1')).toEqual(expectedResult);
//     });
// });

// describe('when getting links', () => {
//     test('should return true', () => {
//         const state = {
//             itemTypes: {
//                 items: null,
//                 links: [{ rel: 'self', href: '/1' }]
//             }
//         };

//         const expectedResult = [{ rel: 'self', href: '/1' }];

//         expect(collectionSelectors.getLinks(state)).toEqual(expectedResult);
//     });
// });

// describe('when getting privilege', () => {
//     it('should return true if matching privilege', () => {
//         const state = {
//             itemTypes: {
//                 items: null,
//                 links: [
//                     { rel: 'self', href: '/1' },
//                     { rel: 'amend-create-serial-numbers', href: '/serial-numbers' }
//                 ]
//             }
//         };

//         const rel = 'amend-create-serial-numbers';

//         const expectedResult = true;

//         expect(collectionSelectors.hasPrivilege(state, rel)).toEqual(expectedResult);
//     });

//     it('should return false if no matching privilege', () => {
//         const state = {
//             itemTypes: {
//                 items: null,
//                 links: [
//                     { rel: 'self', href: '/1' },
//                     { rel: 'amend-create-serial-numbers', href: '/serial-numbers' }
//                 ]
//             }
//         };

//         const rel = 'amend-vat-code';

//         const expectedResult = false;

//         expect(collectionSelectors.hasPrivilege(state, rel)).toEqual(expectedResult);
//     });

//     it('should return false if item has no links', () => {
//         const state = {
//             itemTypes: {
//                 items: null,
//                 links: null
//             }
//         };

//         const rel = 'amend-create-serial-numbers';

//         const expectedResult = false;

//         expect(collectionSelectors.hasPrivilege(state, rel)).toEqual(expectedResult);
//     });
// });

// describe('when getting application state', () => {
//     test('should return state', () => {
//         const state = {
//             itemTypes: {
//                 items: [],
//                 applicationState: { links: [{ rel: 'a', href: '/b' }] }
//             }
//         };

//         const expectedResult = { links: [{ rel: 'a', href: '/b' }] };

//         expect(collectionSelectors.getApplicationState(state)).toEqual(expectedResult);
//     });
// });
