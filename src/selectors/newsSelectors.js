export const getSeenNotifications = state => {
    const { news } = state;
    return news ? news.seen : null;
};

export const getUnseenNotifications = state => {
    const { news } = state;
    return news ? news.unseen : null;
};

export const getNewsLoading = state => {
    const { news } = state;
    return news.loading;
};
