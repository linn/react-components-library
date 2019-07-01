import { connect } from 'react-redux';
import { getMenuSection, getMenuLoading } from '../selectors/menuSelectors';
import MenuPage from '../components/MenuPage';

const getsectionId = ownProps => ownProps.match.params.sectionId;

const mapStateToProps = (state, ownProps) => ({
    section: getMenuSection(state, getsectionId(ownProps)),
    loading: getMenuLoading(state)
});

export default connect(mapStateToProps)(MenuPage);
