export default function ReportSelectors(reportName) {
    this.getReportState = state => {
        const reportState = state[reportName];
        return reportState || {};
    };

    this.getReportData = state => {
        const reportState = this.getReportState(state);
        return reportState.results ? reportState.results.data : null;
    };

    this.getReportLoading = state => {
        const reportState = this.getReportState(state);
        return reportState.results ? reportState.results.loading : false;
    };

    this.getReportOptions = state => {
        const reportState = this.getReportState(state);
        return reportState.options;
    };
}
