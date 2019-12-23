export default function ItemSelectors(item) {
    this.getItem = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.item ? storeItem.item : null;
    };

    this.getLoading = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.loading;
    };

    this.getEditStatus = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.editStatus ? storeItem.editStatus : 'view';
    };

    this.getSnackbarVisible = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.snackbarVisible;
    };

    this.getApplicationState = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.applicationState ? storeItem.applicationState : null;
    };

    this.getApplicationStateLoading = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return false;
        }

        return storeItem.applicationState ? storeItem.applicationState.loading : false;
    };
}
