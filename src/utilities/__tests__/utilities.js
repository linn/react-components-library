import { getHref, getSelfHref } from '../index';

describe('when getting href', () => {
    let item;
    let expectedResult;

    describe('when rel present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }]
            }
        });

        test('should return href', () => {
            expectedResult = '/2';
            expect(getHref(item, 'r2')).toEqual(expectedResult);
        });
    });

    describe('when rel not present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }]
            }
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(getHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when object not present', () => {
        beforeEach(() => {
            item = null;
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(getHref(item, 'r3')).toEqual(expectedResult);
        });
    });
});


describe('when getting getSelfHref', () => {
    let item;
    let expectedResult;

    describe('when rel present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'self', href: 'self/2' }]
            }
        });

        test('should return href', () => {
            expectedResult = 'self/2';
            expect(getSelfHref(item, 'r2')).toEqual(expectedResult);
        });
    });

    describe('when rel not present', () => {
        beforeEach(() => {
            item = {
                links: [
                    { rel: 'r1', href: '/1' },
                    { rel: 'r2', href: '/2' }]
            }
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(getSelfHref(item, 'r3')).toEqual(expectedResult);
        });
    });

    describe('when object not present', () => {
        beforeEach(() => {
            item = null;
        });

        test('should not return href', () => {
            expectedResult = null;
            expect(getSelfHref(item, 'r3')).toEqual(expectedResult);
        });
    });
});