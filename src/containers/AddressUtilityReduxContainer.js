import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import itemSelectorHelpers from '../selectors/itemSelectorHelpers';
import collectionSelectorHelpers from '../selectors/collectionSelectorHelpers';
import AddressUtility from '../components/AddressUtility';

// this container just wraps the component in all the redux gubbins necessary to make it work
// I wanted to common-ise the component and not couple it to redux dispatching and selecting
// such that it can be reused in future apps that might not use redux
function AddressUtilityReduxContainer({
    onCreateSuccess,
    onSelectAddress,
    addressActions,
    addressesActions,
    countriesActions,
    defaultAddressee,
    addressItemType,
    addressesItemType,
    countriesItemType
}) {
    const dispatch = useDispatch();
    const addressStoreItem = useSelector(state => state[addressItemType.item]);
    const addressesStoreItem = useSelector(state => state[addressesItemType.item]);
    const countriesStoreItem = useSelector(state => state[countriesItemType.item]);
    const address = addressStoreItem.item;

    const [isActive, setIsActive] = useState(false);

    if (isActive && address?.addressId) {
        onCreateSuccess(address);
        dispatch(addressActions.clearItem());
        setIsActive(false);
    }

    return (
        <AddressUtility
            defaultAddressee={defaultAddressee}
            createAddress={data => dispatch(addressActions.add(data))}
            selectAddress={onSelectAddress}
            searchCountries={searchTerm => dispatch(countriesActions.search(searchTerm))}
            countriesSearchResults={collectionSelectorHelpers.getSearchItems(
                countriesStoreItem,
                100,
                'countryCode',
                'countryCode',
                'countryName'
            )}
            countriesSearchLoading={collectionSelectorHelpers.getSearchLoading(countriesStoreItem)}
            clearCountriesSearch={() => dispatch(countriesActions.clearSearch())}
            searchAddresses={searchTerm => dispatch(addressesActions.search(searchTerm))}
            addressSearchResults={collectionSelectorHelpers.getSearchItems(
                addressesStoreItem,
                100,
                'addressId',
                'addressee',
                'line1'
            )}
            addressSearchLoading={collectionSelectorHelpers.getSearchLoading(addressesStoreItem)}
            clearAddressesSearch={() => dispatch(addressesActions.clearSearch())}
            createAddressLoading={itemSelectorHelpers.getItemLoading(addressStoreItem)}
            setIsActive={setIsActive}
            isActive={isActive}
        />
    );
}

export default AddressUtilityReduxContainer;
