import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Page from '../components/Page';

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Page)
);
