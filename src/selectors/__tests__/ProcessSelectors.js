import ProcessSelectors from '../ProcessSelectors';

const processSelectors = new ProcessSelectors('processType');

describe('when getting data', () => {
    test('should return data', () => {
        const state = {
            processType: {
                data: { name: 'name' }
            }
        };

        const expectedResult = { name: 'name' };

        expect(processSelectors.getData(state)).toEqual(expectedResult);
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

        expect(processSelectors.getWorking(state)).toEqual(expectedResult);
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

        expect(processSelectors.getMessageText(state)).toEqual(expectedResult);
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

        expect(processSelectors.getMessageVisible(state)).toEqual(expectedResult);
    });
});
