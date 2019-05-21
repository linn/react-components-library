import * as actionTypes from '../actions';

const fetchErrorReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ERROR:
            return action.payload.error
                ? {
                      status: action.payload.error.status,
                      statusText: action.payload.error.statusText,
                      errors: action.payload.error.details.errors
                  }
                : { statusText: action.payload };
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
