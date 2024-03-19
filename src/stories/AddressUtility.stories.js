/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { action } from '@storybook/addon-actions';
import AddressUtility from '../components/AddressUtility';
import providers from './renderUtils/Providers';
import AddresUtilityDocs from './AddressUtilityDocs.mdx';

const defaultArgs = {
    createAddress: action('createAddress'),
    createAddressLoading: false,
    selectAddress: action('selectAddress'),
    searchCountries: action('searchCountries'),
    searchAddresses: action('searchAddresses'),
    countriesSearchResults: [],
    countriesSearchLoading: false,
    addressSearchResults: [],
    addressSearchLoading: false,
    clearAddressesSearch: action('clearAddressesSearch'),
    clearCountriesSearch: action('clearCountriesSearch'),
    defaultAddressee: 'default addressee'
};

export default {
    title: 'Components/AddressUtility',
    parameters: {
        docs: {
            page: AddresUtilityDocs
        }
    },
    decorators: [story => providers(story)],
    component: AddressUtility
};
export function Default(args) {
    return <AddressUtility {...args} />;
}

Default.story = { name: 'default' };
Default.args = defaultArgs;
