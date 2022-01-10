export const getItem = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.item ? storeItem.item : null;
};

export const getLoading = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.loading;
};

export const getEditStatus = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.editStatus ? storeItem.editStatus : 'view';
};

export const getSnackbarVisible = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.snackbarVisible;
};

export const getApplicationState = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.applicationState ? storeItem.applicationState : null;
};

export const getApplicationStateLoading = storeItem => {
    if (!storeItem) {
        return false;
    }

    return storeItem.applicationState ? storeItem.applicationState.loading : false;
};
