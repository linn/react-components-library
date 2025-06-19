import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';

export default function ReportActions(reportName, actionTypeRoot, uri, actionTypes, appRoot) {
    this.fetchReport = options => {
        const endpoint = options
            ? `${appRoot}${uri}?${new URLSearchParams(options).toString()}`
            : `${appRoot}${uri}`;

        return {
            [RSAA]: {
                endpoint,
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
        };
    };
}
