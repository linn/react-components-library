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
                rsaaTypes.requestReport(actionTypes, actionTypeRoot, options),
                rsaaTypes.received(actionTypes, actionTypeRoot, reportName),
                rsaaTypes.error(actionTypes, actionTypeRoot, reportName)
            ]
        }
    });
}
