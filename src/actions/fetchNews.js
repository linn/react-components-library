import { RSAA } from 'redux-api-middleware';
import * as actionTypes from './index';
import * as rsaaTypes from './rsaaTypes';

const fetchNews = (state, root) => ({
    [RSAA]: {
        endpoint: `${root}/notifications`,
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
                payload: async (action, state, res) => ({ news: await res.json(), item: 'news' })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) =>
                    res ? `Report - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

export default fetchNews;
