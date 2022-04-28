const makeActionTypes = (entityType, makeAll = true, makeDelete = false) => {
    const types = {};
    types[`REQUEST_${entityType}`] = `REQUEST_${entityType}`;
    types[`REQUEST_APPLICATION_STATE_${entityType}`] = `REQUEST_APPLICATION_STATE_${entityType}`;
    types[`RECEIVE_${entityType}`] = `RECEIVE_${entityType}`;
    types[`RECEIVE_APPLICATION_STATE_${entityType}`] = `RECEIVE_APPLICATION_STATE_${entityType}`;
    types[`REQUEST_SEARCH_${entityType}`] = `REQUEST_SEARCH_${entityType}`;
    types[`RECEIVE_SEARCH_${entityType}`] = `RECEIVE_SEARCH_${entityType}`;
    types[`CLEAR_SEARCH_${entityType}`] = `CLEAR_SEARCH_${entityType}`;
    types[`FETCH_${entityType}_ERROR`] = `FETCH_${entityType}_ERROR`;
    types[`CLEAR_${entityType}_ERRORS`] = `CLEAR_${entityType}_ERRORS`;
    types[`CLEAR_${entityType}_DATA`] = `CLEAR_${entityType}_DATA`;

    if (makeAll) {
        types[`REQUEST_ADD_${entityType}`] = `REQUEST_ADD_${entityType}`;
        types[`REQUEST_CREATE_${entityType}`] = `REQUEST_CREATE_${entityType}`;
        types[`REQUEST_UPDATE_${entityType}`] = `REQUEST_UPDATE_${entityType}`;
        types[`RECEIVE_UPDATED_${entityType}`] = `RECEIVE_UPDATED_${entityType}`;
        types[`REQUEST_PATCH_${entityType}`] = `REQUEST_PATCH_${entityType}`;
        types[`RECEIVE_PATCH_${entityType}`] = `RECEIVE_PATCH_${entityType}`;
        types[`RESET_${entityType}`] = `RESET_${entityType}`;
        types[`RECEIVE_NEW_${entityType}`] = `RECEIVE_NEW_${entityType}`;
        types[`SET_${entityType}_EDIT_STATUS`] = `SET_${entityType}_EDIT_STATUS`;
        types[`SHOW_${entityType}_SNACKBAR`] = `SHOW_${entityType}_SNACKBAR`;
        types[`HIDE_${entityType}_SNACKBAR`] = `HIDE_${entityType}_SNACKBAR`;
        types[`REQUEST_POST_${entityType}`] = `REQUEST_POST_${entityType}`;
        types[`RECEIVE_POST_${entityType}`] = `RECEIVE_POST_${entityType}`;
    }

    if (makeDelete) {
        types[`REQUEST_DELETE_${entityType}`] = `REQUEST_DELETE_${entityType}`;
        types[`RECEIVE_DELETED_${entityType}`] = `RECEIVE_DELETED_${entityType}`;
    }

    return types;
};

export default makeActionTypes;
