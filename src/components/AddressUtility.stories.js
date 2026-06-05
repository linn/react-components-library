import { MemoryRouter } from 'react-router-dom';
import { useArgs } from 'storybook/preview-api';
import { action } from 'storybook/actions';
import AddressUtility from './AddressUtility';

function StatefulAddressUtility(args) {
    const [{ isActive }, updateArgs] = useArgs();
    return (
        <AddressUtility
            {...args}
            isActive={isActive}
            setIsActive={newActive => updateArgs({ isActive: newActive })}
        />
    );
}

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
    render: StatefulAddressUtility,
    decorators: [
        Story => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    args: {
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
        defaultAddressee: false,
        isActive: false
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
