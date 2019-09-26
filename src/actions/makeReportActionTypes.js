const makeReportActionTypes = entityType => {
    const types = {};
    types[`REQUEST_${entityType}`] = `REQUEST_${entityType}`;
    types[`RECEIVE_${entityType}`] = `RECEIVE_${entityType}`;
    types[`FETCH_${entityType}_ERROR`] = `FETCH_${entityType}_ERROR`;
    types[`CLEAR_${entityType}_ERRORS`] = `CLEAR_${entityType}_ERRORS`;

    return types;
};

export default makeReportActionTypes;
