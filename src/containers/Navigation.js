import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navigation from '../components/Navigation';
import menuActions from '../actions/menuActions';
import menuSelectors from '../selectors/menuSelectors';
import newsSelectors from '../selectors/newsSelectors';
import getUsername from '../selectors/userSelectors';
import initialiseOnMount from '../components/common/initialiseOnMount';
import markNotificationSeen from '../actions/markNotificationSeen';
import config from '../config';
import newsActions from '../actions/newsActions';

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
    dispatch(menuActions.fetch());
    dispatch(newsActions.fetch());
};

const mapDispatchToProps = {
    initialise,
    markNotificationSeen
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Navigation))
);
