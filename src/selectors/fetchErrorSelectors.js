﻿export default (state, key) => {
    const { errors } = state;
    if (!errors) {
        return null;
    }


    //sometimes the action itself represents an error... See https://www.npmjs.com/package/redux-api-middleware#error
    const erroredAction = () => Object.prototype.hasOwnProperty.call(errors, key);
    if (erroredAction()) {
        return errors[key].message;
    }

    // the other case, a _FETCH_ERROR action has been dispatched and added a part to error state
    const hasErrorForKey = () => Object.prototype.hasOwnProperty.call(errors, key) && errors[key];
    let hasErrorProperty = false;

    if (hasErrorForKey()) {
        hasErrorProperty = Object.prototype.hasOwnProperty.call(errors[key], 'error');
        hasErrorProperty = true;
    }

    if (hasErrorProperty) {
        return errors[key].statusText;
    }

    // if (hasErrorMessageProperty && errors.errors[0].errorMessage) {
    //     return errors.errors[0].errorMessage;
    // }

    // if (errors.statusText) {
    //     return errors.statusText.message || errors.statusText;
    // }
    console.log('nothing happened');
    return null;
};
