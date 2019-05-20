export default function CollectionSelectors(itemType, idField = 'id') {
    this.getItems = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return [];
        }

        return storeItems.items ? storeItems.items : [];
    };

    this.getSearchItems = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return [];
        }

        return storeItems.searchItems ? storeItems.searchItems : [];
    };

    this.getItem = (state, id) => {
        const storeItems = this.getItems(state);
        return storeItems.find(a => a[idField] === id);
    };

    this.getItemByHref = (state, href) => {
        const storeItems = this.getItems(state);
        return storeItems.find(a => a.href === href);
    };

    this.getLoading = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return null;
        }

        return storeItems.loading;
    };

    this.getSearchLoading = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return null;
        }

        return storeItems.searchLoading;
    };
}
