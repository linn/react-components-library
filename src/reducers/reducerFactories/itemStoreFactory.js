export default function(
    itemRoot,
    actionTypes,
    defaultState = { loading: false, item: null, editStatus: 'view', snackbarVisible: false }
) {
    return (state = defaultState, action) => {
        switch (action.type) {
            case actionTypes[`REQUEST_ADD_${itemRoot}`]:
                return {
                    ...state,
                    loading: true,
                    editStatus: 'create'
                };
            case actionTypes[`REQUEST_CREATE_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: null,
                    editStatus: 'create'
                };
            case actionTypes[`REQUEST_${itemRoot}`]:
                return {
                    ...state,
                    item: null,
                    loading: true,
                    editStatus: 'view'
                };

            case actionTypes[`REQUEST_UPDATE_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes.FETCH_ERROR:
                return {
                    ...state,
                    loading: false
                };

            case actionTypes[`SET_${itemRoot}_EDIT_STATUS`]:
                return {
                    ...state,
                    editStatus: action.payload
                };

            case actionTypes[`RESET_${itemRoot}`]:
                return {
                    ...state,
                    editStatus: 'view'
                };

            case actionTypes[`RECEIVE_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'view'
                };

            case actionTypes[`RECEIVE_UPDATED_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'view',
                    snackbarVisible: true
                };

            case actionTypes[`RECEIVE_NEW_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'view',
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
