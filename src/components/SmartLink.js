import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SmartLink = ({ to, appRoutes, text }) => (
    <Fragment>
        {appRoutes.some(el => to.startsWith(el)) ? (
            <Link to={to}>{text}</Link>
        ) : (
            <a href={to}> {text} </a>
        )}
    </Fragment>
);

SmartLink.defaultProps = {
    appRoutes: [],
    text: ''
};

SmartLink.propTypes = {
    appRoutes: PropTypes.arrayOf(PropTypes.string),
    to: PropTypes.string.isRequired,
    text: PropTypes.string
};

export default SmartLink;
