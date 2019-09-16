export const getRequestErrors = state => {
    const { errors } = state;
    if (!errors) {
        return null;
    }
    const erroredAction = () => Object.prototype.hasOwnProperty.call(errors, 'requestErrors');
    if (erroredAction()) {
        return errors.requestErrors; // todo - better
    }
    return null;
};

export const getItemErrorMessage = (state, item) => {
    const { errors } = state;
    if (!errors) {
        return null;
    }

    const hasErrorForKey = () => Object.prototype.hasOwnProperty.call(errors, item) && errors[item];
    let hasErrorProperty = false;

    if (hasErrorForKey()) {
        hasErrorProperty = Object.prototype.hasOwnProperty.call(errors[item], 'error');
        hasErrorProperty = true;
    }

    if (hasErrorProperty) {
        return errors[item].statusText;
    }

    return null;
};
