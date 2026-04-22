import { MemoryRouter } from 'react-router-dom';
import { fn } from 'storybook/test';
import AddressUtility from './AddressUtility';

const sampleCountries = [
    { id: 'GB', name: 'United Kingdom', countryCode: 'GB', countryName: 'United Kingdom' },
    { id: 'US', name: 'United States', countryCode: 'US', countryName: 'United States' },
    { id: 'DE', name: 'Germany', countryCode: 'DE', countryName: 'Germany' }
];

const sampleAddresses = [
    {
        id: 1,
        name: '1 Linn Products Way',
        description: 'Glasgow, G76 0EQ',
        addressId: 1,
        postCode: 'G76 0EQ',
        countryCode: 'GB',
        href: '/addresses/1'
    }
];

export default {
    title: 'Components/AddressUtility',
    component: AddressUtility,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
        createAddress: fn(),
        createAddressLoading: false,
        selectAddress: fn(),
        searchCountries: fn(),
        searchAddresses: fn(),
        countriesSearchResults: [],
        countriesSearchLoading: false,
        addressSearchResults: [],
        addressSearchLoading: false,
        clearAddressesSearch: fn(),
        clearCountriesSearch: fn(),
        defaultAddressee: false,
        isActive: false,
        setIsActive: fn()
    }
};

export const Default = {};

export const DialogOpen = {
    name: 'Dialog open',
    args: {
        isActive: true
    }
};

export const WithCountryResults = {
    name: 'Dialog open with country results',
    args: {
        isActive: true,
        countriesSearchResults: sampleCountries
    }
};

export const WithAddressResults = {
    name: 'Dialog open with address results',
    args: {
        isActive: true,
        addressSearchResults: sampleAddresses
    }
};

export const LoadingAddress = {
    name: 'Loading address creation',
    args: {
        isActive: true,
        createAddressLoading: true
    }
};
