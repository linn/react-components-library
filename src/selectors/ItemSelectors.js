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
}
