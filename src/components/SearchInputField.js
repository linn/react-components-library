import React from 'react';

import InputField from './InputField.js';
import SearchIcon from './SearchIcon.js';

function SearchInputField({ autoFocus = false, propertyName, ...rest }) {
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
