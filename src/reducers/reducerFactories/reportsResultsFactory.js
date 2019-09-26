export default function(reportRoot, actionTypes, defaultState = { loading: false, data: null }) {
    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_${reportRoot}`]:
                return {
                    ...state,
                    loading: true,
                    data: null
                };

            case actionTypes[`RECEIVE_${reportRoot}`]:
                return {
                    ...state,
                    loading: false,
                    data: action.payload.data.reportResults
                };
            case actionTypes[`FETCH_${reportRoot}_ERROR`]:
                return {
                    ...state,
                    loading: false
                };

            default:
                return state;
        }
    };
}
