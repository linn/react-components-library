import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Breadcrumbs from '../components/Breadcrumbs';

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs));