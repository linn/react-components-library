import utilities from '../../utilities/index';

export default function(
    itemRoot,
    actionTypes,
    defaultState = { loading: false, searchLoading: false, items: [], searchItems: [] }
) {
    const makeItem = item => ({ ...item, href: utilities.getSelfHref(item) });

    const getItems = items => {
        if (items) {
            return items.map(i => makeItem(i));
        }

        return items;
    };

    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };
            case actionTypes[`REQUEST_APPLICATION_STATE_${itemRoot}`]:
                return {
                    ...state,
                    applicationState: { loading: true }
                };
            case actionTypes[`RECEIVE_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    items: getItems(action.payload.data)
                };
            case actionTypes[`RECEIVE_APPLICATION_STATE_${itemRoot}`]:
                return {
                    ...state,
                    applicationState: {
                        links: action.payload.data ? action.payload.data.links : [],
                        loading: false
                    }
                };
            case actionTypes[`REQUEST_SEARCH_${itemRoot}`]:
                return {
                    ...state,
                    searchLoading: true,
                    searchItems: []
                };
            case actionTypes[`RECEIVE_SEARCH_${itemRoot}`]:
                return {
                    ...state,
                    searchLoading: false,
                    searchItems: getItems(action.payload.data)
                };
            case actionTypes[`CLEAR_SEARCH_${itemRoot}`]:
                return {
                    ...state,
                    searchLoading: false,
                    searchItems: []
                };
            case actionTypes[`CLEAR_${itemRoot}_DATA`]:
                return defaultState;
            case actionTypes[`FETCH_${itemRoot}_ERROR`]:
                return {
                    ...state,
                    loading: false
                };
            case actionTypes[`REQUEST_UPDATE_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };
            case actionTypes[`RECEIVE_UPDATED_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    items: action.payload.data,
                    snackbarVisible: true
                };
            case actionTypes[`SHOW_${itemRoot}_SNACKBAR`]:
                return {
                    ...state,
                    snackbarVisible: true
                };
            case actionTypes[`HIDE_${itemRoot}_SNACKBAR`]:
                return {
                    ...state,
                    snackbarVisible: false
                };
            default:
        }

        return state;
    };
}
