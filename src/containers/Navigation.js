import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navigation from '../components/Navigation';
import { fetchMenu, fetchNews, markNotificationSeen } from '../actions/menuActions';
import { getSections, getMenuLoading, getMyStuff } from '../selectors/menuSelectors';
import { getSeenNotifications, getUnseenNotifications } from '../selectors/newsSelectors';
import getUsername from '../selectors/userSelectors';
import initialiseOnMount from '../components/common/initialiseOnMount';
import config from '../config';

const mapStateToProps = state => ({
    sections: getSections(state),
    myStuff: getMyStuff(state),
    username: getUsername(state),
    loading: getMenuLoading(state),
    seenNotifications: getSeenNotifications(state),
    unseenNotifications: getUnseenNotifications(state),
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(initialiseOnMount(Navigation))
);
