import InputField from './InputField';
import SearchIcon from './SearchIcon';

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
