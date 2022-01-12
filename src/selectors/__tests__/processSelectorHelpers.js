import processSelectorHelpers from '../processSelectorHelpers';

describe('when getting data', () => {
    test('should return data', () => {
        const state = {
            processType: {
                data: { name: 'name' }
            }
        };

        const expectedResult = { name: 'name' };

        expect(processSelectorHelpers.getData(state.processType)).toEqual(expectedResult);
    });
});

describe('when getting working', () => {
    test('should return working', () => {
        const state = {
            processType: {
                working: true
            }
        };

        const expectedResult = true;

        expect(processSelectorHelpers.getWorking(state.processType)).toEqual(expectedResult);
    });
});

describe('when getting message', () => {
    test('should return message text', () => {
        const state = {
            processType: {
                messageText: 'message'
            }
        };

        const expectedResult = 'message';

        expect(processSelectorHelpers.getMessageText(state.processType)).toEqual(expectedResult);
    });
});

describe('when getting message visible', () => {
    test('should return message visible', () => {
        const state = {
            processType: {
                messageVisible: false
            }
        };

        const expectedResult = false;

        expect(processSelectorHelpers.getMessageVisible(state.processType)).toEqual(expectedResult);
    });
});
