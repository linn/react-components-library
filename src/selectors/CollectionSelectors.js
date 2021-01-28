﻿export default function CollectionSelectors(itemType, idField = 'id') {
    this.getItems = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return [];
        }

        return storeItems.items ? storeItems.items : [];
    };

    this.getSearchItems = (state, limit = null) => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return [];
        }

        if (limit) {
            return storeItems.searchItems ? storeItems.searchItems.slice(0, limit) : [];
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

    this.getLinks = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return [];
        }

        return storeItems.links ? storeItems.links : [];
    };

    this.hasPrivilege = (state, rel) => {
        const links = this.getLinks(state);

        return links ? links.some(l => l.rel === rel) : false;
    };

    this.getApplicationState = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return null;
        }

        return storeItems.applicationState ? storeItems.applicationState : null;
    };

    this.getApplicationStateLoading = state => {
        const storeItems = state[itemType];
        if (!storeItems) {
            return false;
        }

        return storeItems.applicationState ? storeItems.applicationState.loading : false;
    };
}
