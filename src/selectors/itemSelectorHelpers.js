const itemSelectorHelpers = {
    getItem: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.item ? storeItem.item : null;
    },
    getItemLoading: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.loading;
    },
    getItemEditStatus: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.editStatus ? storeItem.editStatus : 'view';
    },
    getSnackbarVisible: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.snackbarVisible;
    },
    getApplicationState: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.applicationState ? storeItem.applicationState : null;
    },
    getApplicationStateLoading: storeItem => {
        if (!storeItem) {
            return false;
        }

        return storeItem.applicationState ? storeItem.applicationState.loading : false;
    }
};

export default itemSelectorHelpers;
