import { RSAA } from 'redux-api-middleware';
import queryString from 'query-string';
import * as sharedActionTypes from './index';

export default function ReportActions(actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetchReport = options => ({
        [RSAA]: {
            endpoint: options
                ? `${appRoot}${uri}?${queryString.stringify(options)}`
                : `${appRoot}${uri}`,
            method: 'GET',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json'
            },
            types: [
                {
                    type: actionTypes[`REQUEST_${actionTypeRoot}_REPORT`],
                    payload: { options }
                },
                {
                    type: actionTypes[`RECEIVE_${actionTypeRoot}_REPORT`],
                    payload: async (action, state, res) => ({ data: await res.json() })
                },
                {
                    type: sharedActionTypes.FETCH_ERROR,
                    payload: (action, state, res) =>
                        res ? `Report - ${res.status} ${res.statusText}` : `Network request failed`
                }
            ]
        }
    });
}
