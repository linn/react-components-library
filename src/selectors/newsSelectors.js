const newsSelectors = {
    getSeenNotifications: state => {
        const { news } = state;
        return news ? news.seen : null;
    },

    getUnseenNotifications: state => {
        const { news } = state;
        return news ? news.unseen : null;
    },

    getNewsLoading: state => {
        const { news } = state;
        return news.loading;
    }
};

export default newsSelectors;
