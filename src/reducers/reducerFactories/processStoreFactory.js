export default function(
    itemRoot,
    actionTypes,
    defaultState = { working: false, messageText: '', messageVisible: false },
    successMessage = 'Completed successfully'
) {
    const getMessage = payload => {
        if (payload.data && payload.data.message) {
            return payload.data.message;
        }

        return successMessage;
    };

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
                    messageText: getMessage(action.payload),
                    messageVisible: true,
                    data: action.payload.data
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

            case actionTypes[`CLEAR_${itemRoot}_DATA`]:
                return {
                    ...state,
                    working: false,
                    messageText: successMessage,
                    messageVisible: false,
                    data: null
                };

            default:
        }

        return state;
    };
}
