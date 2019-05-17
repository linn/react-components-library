export const makeActionTypes = (entityType, makeAll = true) => {
    const types = {};
    types[`REQUEST_${entityType}`] = `REQUEST_${entityType}`;
    types[`RECEIVE_${entityType}`] = `RECEIVE_${entityType}`;
    types[`REQUEST_SEARCH_${entityType}`] = `REQUEST_SEARCH_${entityType}`;
    types[`RECEIVE_SEARCH_${entityType}`] = `RECEIVE_SEARCH_${entityType}`;
    types[`CLEAR_SEARCH_${entityType}`] = `CLEAR_SEARCH_${entityType}`;

    if (makeAll) {
        types[`REQUEST_ADD_${entityType}`] = `REQUEST_ADD_${entityType}`;
        types[`REQUEST_CREATE_${entityType}`] = `REQUEST_CREATE_${entityType}`;
        types[`REQUEST_UPDATE_${entityType}`] = `REQUEST_UPDATE_${entityType}`;
        types[`RECEIVE_UPDATED_${entityType}`] = `RECEIVE_UPDATED_${entityType}`;
        types[`RESET_${entityType}`] = `RESET_${entityType}`;
        types[`RECEIVE_NEW_${entityType}`] = `RECEIVE_NEW_${entityType}`;
        types[`SET_${entityType}_EDIT_STATUS`] = `SET_${entityType}_EDIT_STATUS`;
        types[`SHOW_${entityType}_SNACKBAR`] = `SHOW_${entityType}_SNACKBAR`;
        types[`HIDE_${entityType}_SNACKBAR`] = `HIDE_${entityType}_SNACKBAR`;
        types.FETCH_ERROR = 'FETCH_ERROR';
    }

    return types;
};

export const makeReportActionTypes = entityType => {
    const types = {};
    types[`REQUEST_${entityType}_REPORT`] = `REQUEST_${entityType}_REPORT`;
    types[`RECEIVE_${entityType}_REPORT`] = `RECEIVE_${entityType}_REPORT`;

    return types;
};

export const FETCH_ERROR = 'FETCH_ERROR';
