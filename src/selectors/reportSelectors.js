export const getReportState = (state, reportName) => {
    const reportState = state[reportName];
    return reportState || {};
};

export const getReportData = (state, reportName) => {
    const reportState = getReportState(state, reportName);
    return reportState.results ? reportState.results.data : null;
};

export const getReportLoading = (state, reportName) => {
    const reportState = getReportState(state, reportName);
    return reportState.results ? reportState.results.loading : false;
};

export const getReportOptions = (state, reportName) => {
    const reportState = getReportState(state, reportName);
    return reportState.options;
};
