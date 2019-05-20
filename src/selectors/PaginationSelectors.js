export default function PaginationSelectors(itemType, idField = 'id') {
    this.getPage = state => {
        const storePage = state[itemType].page;
        if (!storePage) {
            return null;
        }

        return storePage;
    };

    this.getItems = state => {
        const storeElements = state[itemType].page.elements;
        if (!storeElements) {
            return [];
        }

        return storeElements;
    };

    this.getItem = (state, id) => {
        const storeElements = this.getItems(state);
        return storeElements.find(a => a[idField] === id);
    };

    this.getItemByHref = (state, href) => {
        const storeElements = this.getItems(state);
        return storeElements.find(a => a.href === href);
    };

    this.getLoading = state => {
        const storePage = state[itemType];
        if (!storePage) {
            return null;
        }

        return storePage.loading;
    };
}
