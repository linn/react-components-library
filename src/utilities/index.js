const utilities = {
    getHref: (itemWithLinks, rel) => {
        if (itemWithLinks && itemWithLinks.links && itemWithLinks.links.length > 0) {
            const link = itemWithLinks.links.find(l => l.rel === rel);

            return link ? link.href : null;
        }

        return null;
    },

    getSelfHref: itemWithLinks => this.getHref(itemWithLinks, 'self'),

    sortList: list =>
        list.slice().sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }),
    sortEntityList: (list, property) =>
        list.slice().sort((a, b) => {
            if (a[property] < b[property]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        })
};

export default utilities;
