export const getActionErrorMessage = (state, key) => {
    const { errors } = state;
    if (!errors) {
        return null;
    }
    const erroredAction = () => Object.prototype.hasOwnProperty.call(errors, key);
    if (erroredAction()) {
        return errors[key].message;
    }
    return null;
};

export const getFetchErrorMessage = (state, key) => {
    const { errors } = state;
    if (!errors) {
        return null;
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
    return null;
};
