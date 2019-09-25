import { RSAA } from 'redux-api-middleware';
import queryString from 'query-string';
import * as rsaaTypes from './rsaaTypes';

export default function ReportActions(reportName, actionTypeRoot, uri, actionTypes, appRoot) {
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
                    payload: { options, item: reportName }
                },
                {
                    type: actionTypes[`RECEIVE_${actionTypeRoot}_REPORT`],
                    payload: async (action, state, res) => ({
                        data: await res.json(),
                        item: reportName
                    })
                },
                rsaaTypes.error(actionTypes, actionTypeRoot, reportName)
            ]
        }
    });
}
