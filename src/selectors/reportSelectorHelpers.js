export const getReportState = reportState => reportState || {};

export const getReportData = reportState => reportState.results ? reportState.results.data : null;

export const getReportLoading = reportState => reportState.results ? reportState.results.loading : false;

export const getReportOptions = reportState => reportState.options;
