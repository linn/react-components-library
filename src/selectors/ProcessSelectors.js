export default function ProcessSelectors(item) {
    this.getWorking = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.working;
    };

    this.getMessageVisible = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.messageVisible;
    };

    this.getMessageText = state => {
        const storeItem = state[item];
        if (!storeItem) {
            return null;
        }

        return storeItem.messageText;
    };
}
