import { REQUEST_MENU, RECEIVE_MENU } from '../actions/index';

function menu(state = { loading: false, data: null }, action) {
    switch (action.type) {
        case REQUEST_MENU:
            return {
                ...state,
                loading: true,
                data: null
            };

        case RECEIVE_MENU:
            return {
                ...state,
                loading: false,
                data: action.payload.menu
            };

        default:
            return state;
    }
}

export default menu;
