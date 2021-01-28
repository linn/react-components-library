/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import SearchIcon from './SearchIcon';

function SearchInputField({ autoFocus, ...rest }) {
    return <InputField adornment={SearchIcon()} autoFocus={autoFocus} {...rest} />;
}

SearchInputField.propTypes = {
    autoFocus: PropTypes.bool
};

SearchInputField.defaultProps = {
    autoFocus: false
};

export default SearchInputField;
