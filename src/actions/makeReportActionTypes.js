const makeReportActionTypes = entityType => {
    const types = {};
    types[`REQUEST_${entityType}_REPORT`] = `REQUEST_${entityType}_REPORT`;
    types[`RECEIVE_${entityType}_REPORT`] = `RECEIVE_${entityType}_REPORT`;
    types[`FETCH_${entityType}_ERROR`] = `FETCH_${entityType}_ERROR`;
    types[`CLEAR_${entityType}_ERRORS`] = `CLEAR_${entityType}_ERRORS`;

    return types;
};

export default makeReportActionTypes;
