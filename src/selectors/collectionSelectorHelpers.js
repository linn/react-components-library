const collectionSelectorHelpers = {
    getItems: storeItems => {
        if (!storeItems) {
            return [];
        }

        return storeItems.items ? storeItems.items : [];
    },
    getSearchItems: (
        storeItems,
        limit = null,
        idFieldName = null,
        nameFieldName = null,
        descriptionFieldName = null
    ) => {
        let result = [];

        if (!storeItems) {
            return result;
        }

        result = storeItems.searchItems;

        if (limit) {
            result = storeItems.searchItems ? storeItems.searchItems.slice(0, limit) : [];
        }

        if (idFieldName) {
            result = result.map(x => ({ ...x, id: x[idFieldName] }));
        }

        if (descriptionFieldName) {
            result = result.map(x => ({ ...x, description: x[descriptionFieldName] }));
        }

        if (nameFieldName) {
            result = result.map(x => ({ ...x, name: x[nameFieldName] }));
        }

        return result || [];
    },
    getItem: (storeItems, id, idField = 'id') => {
        const items = collectionSelectorHelpers.getItems(storeItems);
        return items?.find(a => a[idField] === id);
    },
    getItemByHref: (storeItems, href) => {
        const items = collectionSelectorHelpers.getItems(storeItems);
        return items?.find(a => a.href === href);
    },
    getLoading: storeItems => {
        if (!storeItems) {
            return null;
        }

        return storeItems.loading;
    },
    getSearchLoading: storeItems => {
        if (!storeItems) {
            return null;
        }

        return storeItems.searchLoading;
    },
    getLinks: storeItems => {
        if (!storeItems) {
            return [];
        }

        return storeItems.links ? storeItems.links : [];
    },
    hasPrivilege: (storeItems, rel) => {
        const links = collectionSelectorHelpers.getLinks(storeItems);

        return links ? links.some(l => l.rel === rel) : false;
    },
    getApplicationState: storeItems => {
        if (!storeItems) {
            return null;
        }

        return storeItems.applicationState ? storeItems.applicationState : null;
    },
    getApplicationStateLoading: storeItems => {
        if (!storeItems) {
            return false;
        }

        return storeItems.applicationState ? storeItems.applicationState.loading : false;
    }
};

export default collectionSelectorHelpers;
