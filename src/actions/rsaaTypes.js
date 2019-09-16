const successPayload = async (action, state, res) => ({ data: await res.json() });

export const requested = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_${actionTypeRoot}`],
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

export const receiveUpdated = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`RECEIVE_UPDATED_${actionTypeRoot}`],
    payload: successPayload
});

export const received = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
    payload: successPayload
});

export const receiveAdded = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`RECEIVE_NEW_${actionTypeRoot}`],
    payload: successPayload
});

export const requestSearch = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`REQUEST_SEARCH_${actionTypeRoot}`],
    payload: {}
});

export const receiveSearch = (actionTypes, actionTypeRoot) => ({
    type: actionTypes[`RECEIVE_SEARCH_${actionTypeRoot}`],
    payload: successPayload
});

export const error = (actionTypes, actionTypeRoot, itemName) => ({
    type: actionTypes[`${actionTypeRoot}_FETCH_ERROR`],
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
