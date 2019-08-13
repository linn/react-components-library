import utilities from '../../utilities/index';

export default function(
    itemRoot,
    actionTypes,
    defaultState = { loading: false, page: { elements: [] } }
) {
    const makeItem = item => ({ ...item, href: utilities.getSelfHref(item) });

    const getItems = items => {
        if (items.elements !== 'undefined') {
            const elements = items.elements.map(i => makeItem(i));
            return { ...items, elements };
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
                    page: getItems(action.payload.data)
                };
            default:
        }

        return state;
    };
}
