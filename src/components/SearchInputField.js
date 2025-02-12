/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';
import SearchIcon from './SearchIcon';

function SearchInputField({ autoFocus, propertyName, ...rest }) {
    return (
        <InputField
            adornment={SearchIcon()}
            autoFocus={autoFocus}
            propertyName={propertyName}
            {...rest}
        />
    );
}

export default SearchInputField;
