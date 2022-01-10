export const getWorking = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.working;
};

export const getMessageVisible = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.messageVisible;
};

export const getMessageText = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.messageText;
};

export const getData = storeItem => {
    if (!storeItem) {
        return null;
    }

    return storeItem.data;
};
