import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';
import { object } from 'prop-types';

export default function FetchApiActions(itemName, actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetch = () => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}`,
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

    this.fetchPage = (pageNumber, rowsPerPage) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${pageNumber}/${rowsPerPage}`,
            method: 'GET',
            options: { requires: true },
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

    this.fetchSortedPage = (pageNumber, rowsPerPage, sortBy, asc) => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}/${pageNumber}/${rowsPerPage}/${sortBy}/${asc}`,
            method: 'GET',
            options: { requires: true },
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

    this.search = searchTerm => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}?searchTerm=${searchTerm}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                rsaaTypes.requestSearch(actionTypes, actionTypeRoot),
                rsaaTypes.receiveSearch(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
            ]
        }
    });

    this.searchWithOptions = (searchTerm, options) => {
        return {
            [RSAA]: {
                endpoint: `${appRoot}${uri}?searchTerm=${searchTerm}?${options}`,
                method: 'GET',
                options: { requiresAuth: true },
                headers: {
                    Accept: 'application/json'
                },
                types: [
                    rsaaTypes.requestSearch(actionTypes, actionTypeRoot),
                    rsaaTypes.receiveSearch(actionTypes, actionTypeRoot, itemName),
                    rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
                ]
            }
        };
    };
 
    this.clearSearch = () => ({
        type: actionTypes[`CLEAR_SEARCH_${actionTypeRoot}`],
        payload: {}
    });
}
