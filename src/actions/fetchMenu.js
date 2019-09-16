import { RSAA } from 'redux-api-middleware';
import * as actionTypes from './index';

const fetchMenu = (state, root) => ({
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
                payload: async (action, state, res) => ({ menu: await res.json(), item: 'menu' })
            },
            {
                type: actionTypes.FETCH_ERROR,
                payload: (action, state, res) =>
                    res ? `Report - ${res.status} ${res.statusText}` : `Network request failed`
            }
        ]
    }
});

export default fetchMenu;
