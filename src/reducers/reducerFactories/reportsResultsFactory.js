export default function(itemRoot, actionTypes, defaultState = { loading: false, data: null }) {
    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_${itemRoot}_REPORT`]:
                return {
                    ...state,
                    loading: true,
                    data: null
                };

            case actionTypes[`RECEIVE_${itemRoot}_REPORT`]:
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data.reportResults
                };
            case actionTypes[`FETCH_${itemRoot}_REPORT_ERROR`]:
                return {
                    ...state,
                    loading: false
                };

            default:
                return state;
        }
    };
}
