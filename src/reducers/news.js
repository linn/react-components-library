import { REQUEST_NEWS, RECEIVE_NEWS, MARK_NOTIFICATION_SEEN } from '../actions/index';

function news(state = { loading: false, seen: [], unseen: [] }, action) {
    switch (action.type) {
        case REQUEST_NEWS:
            return {
                ...state,
                loading: true
            };
        case RECEIVE_NEWS:
            return {
                ...state,
                loading: false,
                unseen: action.payload.news.notifications
                    ? action.payload.news.notifications.filter(n => !localStorage.getItem(n.title))
                    : [],
                seen: action.payload.news.notifications
                    ? action.payload.news.notifications.filter(n => localStorage.getItem(n.title))
                    : []
            };
        case MARK_NOTIFICATION_SEEN:
            return {
                ...state,
                seen: [...state.seen, ...state.unseen.filter(e => e.title === action.title)],
                unseen: state.unseen.filter(e => e.title !== action.title)
            };
        default:
            return state;
    }
}

export default news;
