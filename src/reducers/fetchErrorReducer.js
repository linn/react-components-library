import * as actionTypes from '../actions/index';

const fetchErrorReducer = (state, action) => {
    //console.info(state);
    switch (action.type) {
        case 'BOARD_FAIL_TYPE_FETCH_ERROR': // todo need to get actionTypes[`${actionTypeRoot}_FETCH_ERROR`] in here
            return { ...state, [action.type]: action.payload }; //{ 'lol': state.fetchError, new: action.type };
        default:
            if (action.error) {
                // this can occur when a request fails (no server response) see https://www.npmjs.com/package/redux-api-middleware#error
                return {
                    statusText:
                        'There was an issue contacting the server, please try again later...'
                };
            }
            return null;
    }
};

export default fetchErrorReducer;
