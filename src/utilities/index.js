export const getHref = (itemWithLinks, rel) => {
    if (itemWithLinks && itemWithLinks.links && itemWithLinks.links.length > 0) {
        const link = itemWithLinks.links.find(l => l.rel === rel);

        return link ? link.href : null;
    }

    return null;
};

export const getSelfHref = itemWithLinks => getHref(itemWithLinks, 'self');

export const sortList = list =>
    list.slice().sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

export const sortEntityList = (list, property) =>
    list.slice().sort((a, b) => {
        if (a[property] < b[property]) {
            return -1;
        }
        if (a[property] > b[property]) {
            return 1;
        }
        return 0;
    });
