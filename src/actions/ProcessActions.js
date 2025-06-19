﻿import { RSAA } from 'redux-api-middleware';
import * as rsaaTypes from './rsaaTypes';

export default function ProcessActions(
    itemName,
    actionTypeRoot,
    uri,
    actionTypes,
    appRoot,
    contentType = 'application/json'
) {
    this.requestProcessStart = (body, options = null) => {
        const makeBody = () => {
            if (!body) return '';
            if (contentType === 'application/json') {
                return JSON.stringify(body);
            }
            return body;
        };

        const makeEndpoint = () => {
            let endpoint = `${appRoot}${uri}`;
            if (options) {
                const query = new URLSearchParams(options).toString();
                endpoint += `?${query}`;
            }
            return endpoint;
        };

        return {
            [RSAA]: {
                endpoint: makeEndpoint(),
                method: 'POST',
                options: { requiresAuth: true },
                headers: {
                    Accept: 'application/json',
                    'Content-Type': contentType
                },
                body: makeBody(body),
                types: [
                    rsaaTypes.requested(actionTypes, actionTypeRoot),
                    rsaaTypes.receivedProcess(actionTypes, actionTypeRoot, itemName),
                    rsaaTypes.error(actionTypes, actionTypeRoot, itemName)
                ]
            }
        };
    };

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

    this.clearErrorsForItem = () => ({
        type: actionTypes[`CLEAR_${actionTypeRoot}_ERRORS`],
        payload: { item: itemName }
    });

    this.clearProcessData = () => ({
        type: actionTypes[`CLEAR_${actionTypeRoot}_DATA`],
        payload: {}
    });
}
