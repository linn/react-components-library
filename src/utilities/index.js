export const getHref = (itemWithLinks, rel) => {
    if (itemWithLinks && itemWithLinks.links && itemWithLinks.links.length > 0) {
        const link = itemWithLinks.links.find(l => l.rel === rel);

        return link ? link.href : null;
    }

    return null;
};

export const getSelfHref = itemWithLinks => getHref(itemWithLinks, 'self');

export const formatCamelCaseToTitleCase = str =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
