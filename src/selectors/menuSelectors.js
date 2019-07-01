export const getSections = state => {
    const { menu } = state;
    if (!menu.data) return null;
    return menu.data.sections;
};

export const getMenuSection = (state, sectionId) => {
    const sections = getSections(state);
    if (sections) {
        const section = sections.filter(x => x.id === sectionId);
        const { columns } = section[0];
        return columns;
    }
    return [];
};

export const getMyStuff = state => {
    const { menu } = state;
    if (!menu.data) return null;
    return menu.data.myStuff;
};

export const getMenuLoading = state => {
    const menu = state;
    return menu ? menu.loading : false;
};
