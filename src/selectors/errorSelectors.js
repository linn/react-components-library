export const getRequestErrors = state => {
    const { errors } = state;
    if (!errors || !errors.requestErrors) {
        return null;
    }
    return errors.requestErrors.length > 0 ? errors.requestErrors : null;
};

export const getItemErrors = state => {
    const { errors } = state;
    if (!(errors && errors.itemErrors)) {
        return null;
    }
    const arr = errors.itemErrors;
    return arr.length > 0 ? arr : null;
};

export const getItemError = (state, item) => {
    const { errors } = state;
    if (!errors || !errors.itemErrors) {
        return null;
    }
    return errors.itemErrors.find(i => i.item && i.item === item) || null;
};

export const getItemErrorDetailMessage = (state, item) => getItemError(state, item)?.details?.errors[0];
