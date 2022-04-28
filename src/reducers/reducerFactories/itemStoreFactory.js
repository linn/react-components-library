﻿export default function (
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

            case actionTypes[`REQUEST_APPLICATION_STATE_${itemRoot}`]:
                return {
                    ...state,
                    applicationState: { loading: true }
                };

            case actionTypes[`REQUEST_UPDATE_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes[`REQUEST_PATCH_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes[`REQUEST_DELETE_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes[`FETCH_${itemRoot}_ERROR`]:
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

            case actionTypes[`RECEIVE_APPLICATION_STATE_${itemRoot}`]:
                return {
                    ...state,
                    applicationState: {
                        links: action.payload.data ? action.payload.data.links : [],
                        loading: false
                    }
                };

            case actionTypes[`RECEIVE_UPDATED_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'view',
                    snackbarVisible: true
                };

            case actionTypes[`RECEIVE_PATCH_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'view',
                    snackbarVisible: true
                };

            case actionTypes[`RECEIVE_DELETED_${itemRoot}`]:
                return {
                    ...state,
                    loading: false,
                    item: action.payload.data,
                    editStatus: 'deleted',
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

            case actionTypes[`REQUEST_POST_${itemRoot}`]:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes[`RECEIVE_POST_${itemRoot}`]:
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

            case actionTypes[`CLEAR_${itemRoot}_DATA`]:
                return defaultState;

            default:
        }

        return state;
    };
}
