import { getData, getMessageText, getWorking, getMessageVisible } from '../processSelectorHelpers';

describe('when getting data', () => {
    test('should return data', () => {
        const state = {
            processType: {
                data: { name: 'name' }
            }
        };

        const expectedResult = { name: 'name' };

        expect(getData(state.processType)).toEqual(expectedResult);
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

        expect(getWorking(state.processType)).toEqual(expectedResult);
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

        expect(getMessageText(state.processType)).toEqual(expectedResult);
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

        expect(getMessageVisible(state.processType)).toEqual(expectedResult);
    });
});
