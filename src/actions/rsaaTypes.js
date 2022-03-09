const successPayload = itemName => async (action, state, res) => ({
    data: await res.json(),
    item: itemName
});

export const requested = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_${actionTypeRoot}`],
    payload: {}
});

export const requestedState = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_APPLICATION_STATE_${actionTypeRoot}`],
    payload: {}
});

export const requestAdd = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_ADD_${actionTypeRoot}`],
    payload: {}
});

export const requestUpdate = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_UPDATE_${actionTypeRoot}`],
    payload: {}
});

export const requestDelete = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_DELETE_${actionTypeRoot}`],
    payload: {}
});

export const receiveUpdated = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_UPDATED_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const received = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const receivedState = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_APPLICATION_STATE_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const receiveAdded = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_NEW_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const receivedProcess = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const receiveDeleted = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_DELETED_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const requestSearch = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_SEARCH_${actionTypeRoot}`],
    payload: {}
});

export const requestReport = (actionTypes, actionTypeRoot, options) => ({
    type: actionTypes[`REQUEST_${actionTypeRoot}`],
    payload: { options }
});

export const receiveSearch = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_SEARCH_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const requestPost = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_POST_${actionTypeRoot}`],
    payload: {}
});

export const receivePost = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`RECEIVE_POST_${actionTypeRoot}`],
    payload: successPayload(itemName)
});

export const error = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`FETCH_${actionTypeRoot}_ERROR`],
    payload: async (action, state, res) =>
        res
            ? {
                  error: {
                      status: res.status,
                      statusText: `Error - ${res.status} ${res.statusText}`,
                      details: await res.json(),
                      item: itemName
                  }
              }
            : `Network request failed`
});
