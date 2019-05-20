import ReportSelectors from '../ReportSelectors';

const reportSelectors = new ReportSelectors('reportName');

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

        expect(reportSelectors.getReportData(state)).toEqual(expectedResult);
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

        expect(reportSelectors.getReportOptions(state)).toEqual(expectedResult);
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

        expect(reportSelectors.getReportLoading(state)).toEqual(true);
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

        expect(reportSelectors.getReportState(state)).toEqual(expectedResult);
    });
});
