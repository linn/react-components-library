import { connect } from 'react-redux';
import Navigation from '../components/Navigation';
import fetchMenu from '../actions/fetchMenu';
import fetchNews from '../actions/fetchNews';
import menuSelectors from '../selectors/menuSelectors';
import newsSelectors from '../selectors/newsSelectors';
import getUsername from '../selectors/legacyUserSelectors';
import initialiseOnMount from '../components/common/initialiseOnMount';
import markNotificationSeen from '../actions/markNotificationSeen';
import config from '../config';

const mapStateToProps = state => ({
    sections: menuSelectors.getSections(state),
    myStuff: menuSelectors.getMyStuff(state),
    username: getUsername(state),
    loading: menuSelectors.getMenuLoading(state),
    seenNotifications: newsSelectors.getSeenNotifications(state),
    unseenNotifications: newsSelectors.getUnseenNotifications(state),
    authRoot: config.authorityUri
});

const initialise = state => dispatch => {
    dispatch(fetchMenu(state, config.proxyRoot));
    dispatch(fetchNews(state, config.proxyRoot));
};

const mapDispatchToProps = {
    initialise,
    markNotificationSeen
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Navigation));
