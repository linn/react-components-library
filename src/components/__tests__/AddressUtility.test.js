import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import render from '../../test-utils';
import AddressUtility from '../AddressUtility';

// Tab on the dialog's country picks the country with exactly the code typed, from the results the
// page gives for a search; Enter searches and lists the results, as before.
const unitedKingdom = {
    id: 'GB',
    name: 'GB - UNITED KINGDOM',
    countryCode: 'GB',
    countryName: 'UNITED KINGDOM'
};
const gibraltar = { id: 'GI', name: 'GI - GIBRALTAR', countryCode: 'GI', countryName: 'GIBRALTAR' };

let createAddress;
let searchCountries;

const dialog = countriesSearchResults => (
    <AddressUtility
        isActive
        setIsActive={jest.fn()}
        createAddress={createAddress}
        selectAddress={jest.fn()}
        searchAddresses={jest.fn()}
        searchCountries={searchCountries}
        countriesSearchResults={countriesSearchResults}
        defaultAddressee="ACME LTD"
    />
);

beforeEach(() => {
    createAddress = jest.fn();
    searchCountries = jest.fn();
});

const tabOutOfCountry = code => {
    const country = screen.getByLabelText('Look up Countries');
    fireEvent.change(country, { target: { value: code } });
    fireEvent.keyDown(country, { key: 'Tab', keyCode: 9 });
};

describe('When a country code is typed and tabbed out of', () => {
    test('Should search for it', () => {
        render(dialog([]));
        tabOutOfCountry('gb');
        expect(searchCountries).toHaveBeenCalledWith('gb');
    });

    test('Should pick the country with that code when the results come', () => {
        const { rerender } = render(dialog([]));
        tabOutOfCountry('gb');
        rerender(dialog([gibraltar, unitedKingdom]));
        expect(screen.getByLabelText('Name')).toHaveValue('UNITED KINGDOM');
    });

    test('Should create the address in that country', () => {
        const { rerender } = render(dialog([]));
        tabOutOfCountry('gb');
        rerender(dialog([unitedKingdom]));
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        expect(createAddress).toHaveBeenCalledWith(
            expect.objectContaining({ addressee: 'ACME LTD', countryCode: 'GB' })
        );
    });
});

describe('When the country code typed is among the results already', () => {
    test('Should pick it without searching again', () => {
        render(dialog([gibraltar, unitedKingdom]));
        tabOutOfCountry('GI');
        expect(screen.getByLabelText('Name')).toHaveValue('GIBRALTAR');
        expect(searchCountries).not.toHaveBeenCalled();
    });
});

describe('When no country has exactly the code typed', () => {
    test('Should pick none', () => {
        const { rerender } = render(dialog([]));
        tabOutOfCountry('G');
        rerender(dialog([gibraltar, unitedKingdom]));
        expect(screen.getByLabelText('Name')).toHaveValue('');
    });
});

describe('When something else is typed before the results come', () => {
    test('Should not pick the country looked up', () => {
        const { rerender } = render(dialog([]));
        tabOutOfCountry('gb');
        fireEvent.change(screen.getByLabelText('Look up Countries'), { target: { value: 'ire' } });
        rerender(dialog([unitedKingdom]));
        expect(screen.getByLabelText('Name')).toHaveValue('');
    });
});

describe('When a country is searched with Enter', () => {
    test('Should search, and pick nothing until a result is chosen', () => {
        const { rerender } = render(dialog([]));
        const country = screen.getByLabelText('Look up Countries');
        fireEvent.change(country, { target: { value: 'GB' } });
        fireEvent.keyDown(country, { key: 'Enter', keyCode: 13 });
        rerender(dialog([unitedKingdom]));
        expect(searchCountries).toHaveBeenCalledWith('GB');
        expect(screen.getByLabelText('Name')).toHaveValue('');
    });
});
