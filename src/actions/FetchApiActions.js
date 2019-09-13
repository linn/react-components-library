import { RSAA } from 'redux-api-middleware';

export default function FetchApiActions(actionTypeRoot, uri, actionTypes, appRoot) {
    const requestedResponse = {
        type: actionTypes[`REQUEST_${actionTypeRoot}`],
        payload: {}
    };
    const receivedResponse = {
        type: actionTypes[`RECEIVE_${actionTypeRoot}`],
        payload: async (action, state, res) => ({ data: await res.json() })
    };
    const errorResponse = {
        type: 'FETCH_BOARD_FAIL_TYPE_ERROR',
        payload: (action, state, res) =>
            res ? `Error - ${res.status} ${res.statusText}` : `Network request failed`
    };

    this.fetch = () => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [requestedResponse, receivedResponse, errorResponse]
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
            types: [requestedResponse, receivedResponse, errorResponse]
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
            types: [requestedResponse, receivedResponse, errorResponse]
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
                errorResponse
            ]
        }
    });

    this.clearSearch = () => ({
        type: actionTypes[`CLEAR_SEARCH_${actionTypeRoot}`],
        payload: {}
    });
}
