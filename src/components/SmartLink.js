import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SmartLink = WrappedComponent => props => {
    const { to, appRoutes } = props;
    return (
        <Fragment>
            {appRoutes.some(el => to.startsWith(el)) ? (
                <Link to={to}>
                    <WrappedComponent {...props} />
                </Link>
            ) : (
                <a href={to}>
                    <WrappedComponent {...props} />
                </a>
            )}
        </Fragment>
    );
};

SmartLink.defaultProps = {
    appRoutes: []
};

SmartLink.propTypes = {
    appRoutes: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.string.isRequired
};

export default SmartLink;
