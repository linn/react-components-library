export const getRequestErrors = state => {
    const { errors } = state;
    if (!errors) {
        return null;
    }
    const hasRequestErrors = () => Object.prototype.hasOwnProperty.call(errors, 'requestErrors');
    if (hasRequestErrors()) {
        return errors.requestErrors;
    }
    return null;
};

export const getItemError = (state, item) => {
    const { errors } = state;
    if (!errors) {
        return null;
    }

    const hasErrorForItem = () =>
        Object.prototype.hasOwnProperty.call(errors, item) && errors[item];

    if (hasErrorForItem()) {
        return errors[item];
    }

    return null;
};
