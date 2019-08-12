﻿import utilities from '../../utilities/index';

export default function(
    itemRoot,
    actionTypes,
    defaultState = { loading: false, searchLoading: false, items: [], searchItems: [], links: [] }
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
            case actionTypes[`RECEIVE_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    items: getItems(action.payload.data.responseData),
                    links: action.payload.data.links
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
                    searchItems: getItems(action.payload.data.responseData),
                    links: action.payload.data.links
                };
            case actionTypes[`CLEAR_SEARCH_${itemRoot}`]:
                return {
                    ...state,
                    searchLoading: false,
                    searchItems: []
                };
            default:
        }

        return state;
    };
}
