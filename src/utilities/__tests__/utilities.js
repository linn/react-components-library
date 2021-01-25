import utilities from '../index';

describe('when getting href', () => {
    let item;
    let expectedResult;

    describe('when rel present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }
                ]
            };
        });

        test('should return href', () => {
            expectedResult = '/2';
            expect(utilities.getHref(item, 'r2')).toEqual(expectedResult);
        });
    });

    describe('when rel not present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }
                ]
            };
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when links is null', () => {
        beforeEach(() => {
            item = {
                links: null
            };
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when links not present', () => {
        beforeEach(() => {
            item = {};
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when object not present', () => {
        beforeEach(() => {
            item = null;
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getHref(item, 'r3')).toEqual(expectedResult);
        });
    });
});

describe('when getting utilities.getSelfHref', () => {
    let item;
    let expectedResult;

    describe('when rel present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'self', href: 'self/2' }
                ]
            };
        });

        test('should return href', () => {
            expectedResult = 'self/2';
            expect(utilities.getSelfHref(item, 'r2')).toEqual(expectedResult);
        });
    });

    describe('when rel not present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }
                ]
            };
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getSelfHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when object not present', () => {
        beforeEach(() => {
            item = null;
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(utilities.getSelfHref(item, 'r3')).toEqual(expectedResult);
        });
    });
});

describe('when sorting an entity list', () => {
    const entityList = [
        {
            name: 'zara',
            age: 44.1,
            created: '2000-06-05T15:00:10.0000000'
        },
        {
            name: 'alfie',
            age: 66,
            created: '2010-06-05T15:00:10.0000000'
        },
        {
            name: 'lars',
            age: 44.7,
            created: '2005-06-05T15:00:10.0000000'
        }
    ];

    describe('when sorting on string field', () => {
        it('should sort the list', () => {
            const expected = [
                {
                    name: 'alfie',
                    age: 66,
                    created: '2010-06-05T15:00:10.0000000'
                },
                {
                    name: 'lars',
                    age: 44.7,
                    created: '2005-06-05T15:00:10.0000000'
                },
                {
                    name: 'zara',
                    age: 44.1,
                    created: '2000-06-05T15:00:10.0000000'
                }
            ];

            expect(utilities.sortEntityList(entityList, 'name')).toEqual(expected);
        });
    });

    describe('when sorting on number field', () => {
        it('should sort the list', () => {
            const expected = [
                {
                    name: 'zara',
                    age: 44.1,
                    created: '2000-06-05T15:00:10.0000000'
                },
                {
                    name: 'lars',
                    age: 44.7,
                    created: '2005-06-05T15:00:10.0000000'
                },
                {
                    name: 'alfie',
                    age: 66,
                    created: '2010-06-05T15:00:10.0000000'
                }
            ];

            expect(utilities.sortEntityList(entityList, 'age')).toEqual(expected);
        });
    });

    describe('when sorting on invalid field', () => {
        it('should not sort entity list', () => {
            const expected = [
                {
                    name: 'zara',
                    age: 44.1,
                    created: '2000-06-05T15:00:10.0000000'
                },
                {
                    name: 'alfie',
                    age: 66,
                    created: '2010-06-05T15:00:10.0000000'
                },
                {
                    name: 'lars',
                    age: 44.7,
                    created: '2005-06-05T15:00:10.0000000'
                }
            ];

            expect(utilities.sortEntityList(entityList, 'height')).toEqual(expected);
        });
    });

    describe('when sorting on iso string field', () => {
        it('should sort the list', () => {
            const expected = [
                {
                    name: 'zara',
                    age: 44.1,
                    created: '2000-06-05T15:00:10.0000000'
                },
                {
                    name: 'lars',
                    age: 44.7,
                    created: '2005-06-05T15:00:10.0000000'
                },
                {
                    name: 'alfie',
                    age: 66,
                    created: '2010-06-05T15:00:10.0000000'
                }
            ];

            expect(utilities.sortEntityList(entityList, 'created')).toEqual(expected);
        });
    });
});

describe('when sorting a list', () => {
    describe('when sorting', () => {
        it('should sort the list', () => {
            const list = ['zara', 'alfie', 'lars'];

            const expected = ['alfie', 'lars', 'zara'];

            expect(utilities.sortList(list)).toEqual(expected);
        });
    });

    describe('when sorting on a iso string', () => {
        it('should sort the list', () => {
            const list = [
                '2005-06-05T15:00:10.0000000',
                '2010-06-05T15:00:10.0000000',
                '2000-06-05T15:00:10.0000000'
            ];

            const expected = [
                '2000-06-05T15:00:10.0000000',
                '2005-06-05T15:00:10.0000000',
                '2010-06-05T15:00:10.0000000'
            ];

            expect(utilities.sortList(list)).toEqual(expected);
        });
    });
});
