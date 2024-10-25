import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import AddressUtilityReduxContainer from '../../containers/AddressUtilityReduxContainer';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

const addressActions = { add: jest.fn() };
const addressesActions = { search: jest.fn() };

addressActions.add.mockReturnValue({ type: 'ADD_ADDRESS', payload: {} });
const countriesActions = { search: jest.fn(), clearSearch: jest.fn() };
countriesActions.search.mockReturnValue({ type: 'SEARCH_COUNTRIES', payload: {} });
countriesActions.clearSearch.mockReturnValue({ type: 'CLEAR_SEARCH_COUNTRIES', payload: {} });

const onCreateSuccess = jest.fn();
const onSelectAddress = jest.fn();

const state = {
    address: {},
    addresses: {},
    countries: {
        loading: false,
        searchItems: [
            { id: 'PG', countryCode: 'PG', countryName: 'PANGEA' },
            { id: 'GB', countryCode: 'GB', countryName: 'BRITTANIA' }
        ]
    }
};

beforeAll(() => {
    useSelector.mockImplementation(callback => callback(state));
});

describe('When addressee value passed...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtilityReduxContainer
                defaultAddressee="Mr Person"
                addressesActions={addressesActions}
                addressActions={addressActions}
                countriesActions={countriesActions}
                onCreateSuccess={onCreateSuccess}
                onSelectAddress={onSelectAddress}
            />
        );
        const openButton = screen.getByRole('button', { name: 'Create Or Look Up Address' });
        fireEvent.click(openButton);
    });

    test('Should render addressee', () => {
        expect(screen.getByDisplayValue('Mr Person')).toBeInTheDocument();
    });
});

describe('When creating an address...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtilityReduxContainer
                defaultAddressee="Mr Person"
                addressesActions={addressesActions}
                addressActions={addressActions}
                countriesActions={countriesActions}
                onCreateSuccess={onCreateSuccess}
                onSelectAddress={onSelectAddress}
            />
        );
        const openButton = screen.getByRole('button', { name: 'Create Or Look Up Address' });
        fireEvent.click(openButton);
    });

    test('Should dispatch add actions with new address as body', async () => {
        const addresseeInput = screen.getByLabelText('Addressee');
        fireEvent.change(addresseeInput, {
            target: { value: 'Mr Person' }
        });

        const addressee2Input = screen.getByLabelText('Addressee 2');
        fireEvent.change(addressee2Input, {
            target: { value: 'CEO of all people' }
        });

        const line1Input = screen.getByLabelText('Line 1');
        fireEvent.change(line1Input, {
            target: { value: '123 Sapien Street' }
        });

        const line2Input = screen.getByLabelText('Line 2');
        fireEvent.change(line2Input, {
            target: { value: 'Bipedal Bay' }
        });

        const line3Input = screen.getByLabelText('Line 3');
        fireEvent.change(line3Input, {
            target: { value: 'Humantown' }
        });

        const line4Input = screen.getByLabelText('Line 4');
        fireEvent.change(line4Input, {
            target: { value: 'Globeshire' }
        });

        const postcodeInput = screen.getByLabelText('Postcode');
        fireEvent.change(postcodeInput, {
            target: { value: 'P01 7PS' }
        });

        const countryLookup = screen.getByLabelText('Look up Countries');
        fireEvent.change(countryLookup, {
            target: { value: 'GB' }
        });

        fireEvent.keyDown(countryLookup, { key: 'Enter', code: 'Enter', keyCode: 13 });
        const result = screen.getByText('BRITTANIA');
        fireEvent.click(result);
        fireEvent.click(result);
        fireEvent.click(result);

        const saveButton = await screen.findByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);
        expect(addressActions.add).toHaveBeenCalledWith(
            expect.objectContaining({
                addressee: 'Mr Person',
                addressee2: 'CEO of all people',
                line1: '123 Sapien Street',
                line2: 'Bipedal Bay',
                line3: 'Humantown',
                line4: 'Globeshire',
                postCode: 'P01 7PS',
                countryCode: 'GB'
            })
        );
    });
});
