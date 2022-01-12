const reportSelectorHelpers = {
    getReportState: reportState => reportState || {},
    getReportData: reportState => (reportState.results ? reportState.results.data : null),
    getReportLoading: reportState => (reportState.results ? reportState.results.loading : false),
    getReportOptions: reportState => reportState.options
};

export default reportSelectorHelpers;
