export default function(
    itemRoot,
    actionTypes,
    defaultState = { working: false, messageText: '', messageVisible: false },
    successMessage = 'Completed successfully'
) {
    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_${itemRoot}`]:
                return {
                    ...state,
                    working: true,
                    data: null
                };

            case actionTypes[`RECEIVE_${itemRoot}`]:
                return {
                    ...state,
                    working: false,
                    messageText: successMessage,
                    messageVisible: true,
                    data: action.payload.data,
                };

            case actionTypes[`SHOW_${itemRoot}_MESSAGE`]:
                return {
                    ...state,
                    messageVisible: true
                };

            case actionTypes[`HIDE_${itemRoot}_MESSAGE`]:
                return {
                    ...state,
                    messageVisible: false
                };

            default:
        }

        return state;
    };
}
