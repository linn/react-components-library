import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';

export default function ProcessActions(itemName, actionTypeRoot, uri, actionTypes, appRoot) {
    this.requestProcessStart = body => ({
        [RSAA]: {
            endpoint: `${appRoot}${uri}`,
            method: 'POST',
            options: { requiresAuth: true },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : '',
            types: [
                rsaaTypes.requested(actionTypes, actionTypeRoot),
                rsaaTypes.receivedProcess(actionTypes, actionTypeRoot, itemName),
                rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
            ]
        }
    });

    this.setMessageVisible = visible => {
        if (visible === true) {
            return {
                type: actionTypes[`SHOW_${actionTypeRoot}_MESSAGE`],
                payload: {}
            };
        }
        return {
            type: actionTypes[`HIDE_${actionTypeRoot}_MESSAGE`],
            payload: {}
        };
    };
}
