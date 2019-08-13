const menuSelectors = {
    getSections: state => {
        const { menu } = state;
        if (!menu || !menu.data) return null;
        return menu.data.sections;
    },
    getMenuSection: (state, sectionId) => {
        const sections = menuSelectors.getSections(state);
        if (sections) {
            const section = sections.filter(x => x.id === sectionId);
            const { columns } = section[0];
            return columns;
        }
        return [];
    },

    getMyStuff: state => {
        const { menu } = state;
        if (!menu || !menu.data) return null;
        return menu.data.myStuff;
    },

    getMenuLoading: state => {
        const menu = state;
        return menu ? menu.loading : false;
    }
};

export default menuSelectors;
