import { RSAA } from 'redux-api-middleware';
import * as actionTypes from './index';

export const fetchNews = (state, root) => ({
    [RSAA]: {
        endpoint: `${root}/intranet/menu-no-auth`,
        method: 'GET',
        options: { requiresAuth: false },
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_NEWS,
                payload: {}
            },
            {
                type: actionTypes.RECEIVE_NEWS,
                payload: async (action, state, res) => ({ news: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) =>
                    res ? `Report - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

export const markNotificationSeen = e => ({
    type: 'MARK_NOTIFICATION_SEEN',
    title: e.title
});

export const fetchMenu = (state, root) => ({
    [RSAA]: {
        endpoint: `${root}/intranet/menu-no-auth`,
        method: 'GET',
        options: { requiresAuth: false },
        headers: {
            Accept: 'application/json'
        },
        types: [
            {
                type: actionTypes.REQUEST_MENU,
                payload: {}
            },
            {
                type: actionTypes.RECEIVE_MENU,
                payload: async (action, state, res) => ({ menu: await res.json() })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) =>
                    res ? `Report - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});
