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
            rsaaTypes.error(actionTypes, 'NEWS', 'news')
        ]
    }
});

export default fetchNews;
