const processSelectorHelpers = {
    getWorking: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.working;
    },
    getMessageVisible: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.messageVisible;
    },
    getMessageText: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.messageText;
    },
    getData: storeItem => {
        if (!storeItem) {
            return null;
        }

        return storeItem.data;
    }
};

export default processSelectorHelpers;
