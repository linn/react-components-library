import React from 'react';
import InputField from './InputField';
import SearchIcon from './SearchIcon';

function SearchInputField(props) {
    return <InputField adornment={SearchIcon()} {...props} />;
}

export default SearchInputField;
