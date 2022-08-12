const reportSelectorHelpers = {
    getReportState: reportState => reportState || {},
    getReportData: reportState => reportState?.results?.data,
    getReportLoading: reportState =>
        reportState?.results?.loading ? reportState.results.loading : false,
    getReportOptions: reportState => reportState?.options
};

export default reportSelectorHelpers;
