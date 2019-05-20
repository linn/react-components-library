import {
    getReportData,
    getReportOptions,
    getReportLoading,
    getReportState
} from '../reportSelectors';

describe('when getting results', () => {
    test('should return results', () => {
        const state = {
            reportName: {
                results: {
                    data: { title: 't' },
                    loading: false
                },
                options: {}
            }
        };

        const expectedResult = { title: 't' };

        expect(getReportData(state, 'reportName')).toEqual(expectedResult);
    });
});

describe('when getting options', () => {
    test('should return options', () => {
        const state = {
            reportName: {
                results: {
                    data: { title: 't' },
                    loading: false
                },
                options: { option1: '1' }
            }
        };

        const expectedResult = { option1: '1' };

        expect(getReportOptions(state, 'reportName')).toEqual(expectedResult);
    });
});

describe('when getting loading', () => {
    test('should return loading', () => {
        const state = {
            reportName: {
                results: {
                    data: { title: 't' },
                    loading: true
                },
                options: { option1: '1' }
            }
        };

        expect(getReportLoading(state, 'reportName')).toEqual(true);
    });
});

describe('when getting state', () => {
    test('should return state', () => {
        const state = {
            reportName: {
                results: {
                    data: { title: 't' },
                    loading: false
                },
                options: { option1: '1' }
            }
        };

        const expectedResult = {
            results: {
                data: { title: 't' },
                loading: false
            },
            options: { option1: '1' }
        };

        expect(getReportState(state, 'reportName')).toEqual(expectedResult);
    });
});
