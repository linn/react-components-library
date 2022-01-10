export const getPage = storeItem => {
    const storePage = storeItem?.page;
    if (!storePage) {
        return null;
    }

    return storePage;
};

export const getItems = storeItem => {
    const storeElements = storeItem?.page?.elements;
    if (!storeElements) {
        return [];
    }

    return storeElements;
};

export const getItem = (storeItem, id, idField = 'id') => {
    const storeElements = getItems(storeItem);
    return storeElements.find(a => a[idField] === id);
};

export const getItemByHref = (storeItem, href) => {
    const storeElements = getItems(storeItem);
    return storeElements.find(a => a.href === href);
};

export const getLoading = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.loading;
};
