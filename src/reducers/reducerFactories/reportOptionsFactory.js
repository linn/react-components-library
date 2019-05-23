export default function(itemRoot, actionTypes, defaultState = {}) {
    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_${itemRoot}_REPORT`]:
                return {
                    ...action.payload.options
                };
            default:
                return state;
        }
    };
}
