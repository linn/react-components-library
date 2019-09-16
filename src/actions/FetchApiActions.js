import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';

export default function FetchApiActions(actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetch = () => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requestedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.receivedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.errorResponse
            ]
        }
    });

    this.fetchPage = (pageNumber, rowsPerPage) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${pageNumber}/${rowsPerPage}`,
            method: 'GET',
            options: { requires: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requestedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.receivedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.errorResponse
            ]
        }
    });

    this.fetchSortedPage = (pageNumber, rowsPerPage, sortBy, asc) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${pageNumber}/${rowsPerPage}/${sortBy}/${asc}`,
            method: 'GET',
            options: { requires: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requestedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.receivedResponse(actionTypes, actionTypeRoot),
                rsaaTypes.errorResponse
            ]
        }
    });

    this.search = searchTerm => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}?searchTerm=${searchTerm}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                {
                    type: actionTypes[`REQUEST_SEARCH_${actionTypeRoot}`],
                    payload: {}
                },
                {
                    type: actionTypes[`RECEIVE_SEARCH_${actionTypeRoot}`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                rsaaTypes.errorResponse
            ]
        }
    });

    this.clearSearch = () => ({
        type: actionTypes[`CLEAR_SEARCH_${actionTypeRoot}`],
        payload: {}
    });
}
