import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import render from '../../test-utils';
import AddressUtility from '../AddressUtility';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
}));

const history = { push: jest.fn(), location: { pathname: 'the-home-url/create-address' } };
const config = { appRoot: '/the-home-url' };
const addressActions = { add: jest.fn() };

addressActions.add.mockReturnValue({ type: 'ADD_ADDRESS', payload: {} });
const countriesActions = { search: jest.fn() };
const closeDialog = jest.fn();

const state = {
    countries: {
        searchItems: [
            { id: 'PG', countryCode: 'PG', countryName: 'PANGEA' },
            { id: 'GB', countryCode: 'GB', countryName: 'BRITTANIA' }
        ]
    }
};

beforeAll(() => {
    useSelector.mockImplementation(callback => callback(state));
});

describe('When not inDialogBox...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtility
                history={history}
                config={config}
                addressActions={addressActions}
                countriesActions={countriesActions}
                backUrl="/previous-page"
            />
        );
    });

    test('Should call history.push() when back button clicked', () => {
        const backButton = screen.getByRole('button', { name: 'Back' });
        fireEvent.click(backButton);
        expect(history.push).toHaveBeenCalledWith('/previous-page');
    });
});

describe('When inDialogBox...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtility
                history={history}
                config={config}
                inDialogBox
                closeDialog={closeDialog}
                addressActions={addressActions}
                countriesActions={countriesActions}
                backUrl="/previous-page"
            />
        );
    });

    test('Should call closeDialog() when back button clicked', () => {
        const backButton = screen.getByRole('button', { name: 'Back' });
        fireEvent.click(backButton);
        expect(closeDialog).toHaveBeenCalled();
    });
});

describe('When addressee value passed...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtility
                addressee="Mr Person"
                history={history}
                config={config}
                addressActions={addressActions}
                countriesActions={countriesActions}
                backUrl="/previous-page"
            />
        );
    });

    test('Should render addressee', () => {
        expect(screen.getByDisplayValue('Mr Person')).toBeInTheDocument();
    });
});

describe('When creating an address...', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <AddressUtility
                history={history}
                config={config}
                addressActions={addressActions}
                countriesActions={countriesActions}
                backUrl="/previous-page"
            />
        );
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

        const countryLookup = screen.getByLabelText('Country Lookup');
        fireEvent.click(countryLookup);

        const result = screen.getByRole('button', { name: 'GB BRITTANIA' });
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
