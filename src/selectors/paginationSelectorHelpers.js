const paginationSelectorHelpers = {
    getPage: storeItem => {
        const storePage = storeItem?.page;
        if (!storePage) {
            return null;
        }

        return storePage;
    },
    getItems: storeItem => {
        const storeElements = storeItem?.page?.elements;
        if (!storeElements) {
            return [];
        }

        return storeElements;
    },
    getItem: (storeItem, id, idField = 'id') => {
        const storeElements = paginationSelectorHelpers.getItems(storeItem);
        return storeElements.find(a => a[idField] === id);
    },
    getItemByHref: (storeItem, href) => {
        const storeElements = paginationSelectorHelpers.getItems(storeItem);
        return storeElements.find(a => a.href === href);
    },
    getLoading: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.loading;
    }
};

export default paginationSelectorHelpers;
