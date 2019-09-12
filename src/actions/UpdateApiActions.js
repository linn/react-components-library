import { RSAA } from 'redux-api-middleware';
import * as sharedActionTypes from './index';

export default function UpdateApiActions(actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetch = id => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${id}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                {
                    type: actionTypes[`REQUEST_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: actionTypes[`${actionTypeRoot}_FETCH_ERROR`], // TODO - GENERATE
                    payload: (action, state, res) =>
                        res
                            ? `${actionTypeRoot} Error - ${res.status} ${res.statusText}`
                            : `Network request failed`
                }
            ]
        }
    });

    this.fetchByHref = href => ({
        [RSAA]: {
            endpoint: `${appRoot}${href}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                {
                    type: actionTypes[`REQUEST_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: sharedActionTypes.FETCH_ERROR,
                    payload: (action, state, res) =>
                        res ? `Error - ${res.status} ${res.statusText}` : `Network request failed`
                }
            ]
        }
    });

    this.fetchByQueryString = (queryString, id) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}?${queryString}=${id}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                {
                    type: actionTypes[`REQUEST_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: sharedActionTypes.FETCH_ERROR,
                    payload: (action, state, res) =>
                        res ? `Error - ${res.status} ${res.statusText}` : `Network request failed`
                }
            ]
        }
    });

    this.add = item => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}`,
            method: 'POST',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            types: [
                {
                    type: actionTypes[`REQUEST_ADD_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_NEW_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: sharedActionTypes.FETCH_ERROR,
                    payload: async (action, state, res) =>
                        res
                            ? {
                                  error: {
                                      status: res.status,
                                      statusText: `Error - ${res.status} ${res.statusText}`,
                                      details: await res.json()
                                  }
                              }
                            : `Network request failed`
                }
            ]
        }
    });

    this.update = (id, item) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${id}`,
            method: 'PUT',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            types: [
                {
                    type: actionTypes[`REQUEST_UPDATE_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_UPDATED_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: sharedActionTypes.FETCH_ERROR,
                    payload: async (action, state, res) =>
                        res
                            ? {
                                  error: {
                                      status: res.status,
                                      statusText: `Error - ${res.status} ${res.statusText}`,
                                      details: await res.json()
                                  }
                              }
                            : `Network request failed`
                }
            ]
        }
    });

    this.reset = () => ({
        type: actionTypes[`RESET_${actionTypeRoot}`],
        payload: {}
    });

    this.setEditStatus = editStatus => ({
        type: actionTypes[`SET_${actionTypeRoot}_EDIT_STATUS`],
        payload: editStatus
    });

    this.create = () => ({
        type: actionTypes[`REQUEST_CREATE_${actionTypeRoot}`],
        payload: {}
    });

    this.setSnackbarVisible = visible => {
        if (visible === true) {
            return {
                type: actionTypes[`SHOW_${actionTypeRoot}_SNACKBAR`],
                payload: {}
            };
        }
        return {
            type: actionTypes[`HIDE_${actionTypeRoot}_SNACKBAR`],
            payload: {}
        };
    };
}
