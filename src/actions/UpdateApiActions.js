import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';

export default function UpdateApiActions(itemName, actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetch = id => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${id}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requested(actionTypes, actionTypeRoot),
                rsaaTypes.received(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
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
                rsaaTypes.requested(actionTypes, actionTypeRoot),
                rsaaTypes.received(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
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
                rsaaTypes.requested(actionTypes, actionTypeRoot),
                rsaaTypes.received(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
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
                rsaaTypes.requestAdd(actionTypes, actionTypeRoot),
                rsaaTypes.receiveAdded(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
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
                rsaaTypes.requestUpdate(actionTypes, actionTypeRoot),
                rsaaTypes.receiveUpdated(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
            ]
        }
    });

    this.delete = id => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${id}`,
            method: 'DELETE',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requestDelete(actionTypes, actionTypeRoot),
                rsaaTypes.receiveDeleted(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
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

    this.clearErrorsForItem = () => ({
        type: actionTypes[`CLEAR_${actionTypeRoot}_ERRORS`],
        payload: { item: itemName }
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
