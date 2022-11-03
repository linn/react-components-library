/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';

//eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from 'redux';
import Dialog from '@mui/material/Dialog';
import { action } from '@storybook/addon-actions';
import AddressUtility from '../components/AddressUtility';
import providers from './renderUtils/Providers';
import AddresUtilityDocs from './AddressUtilityDocs.mdx';

const defaultArgs = {
    history: {
        location: {
            pathname: '/addresses/create'
        },
        push: action('goBack')
    },
    config: { appRoot: '/app' },
    addressActions: {
        add: action('addAddress'),
        setSnackbarVisible: () => action('setSnackbarVisible')
    },
    countriesActions: { search: action('searchCountries') }
};

export default {
    title: 'Components/AddressUtility',
    parameters: {
        docs: {
            page: AddresUtilityDocs
        }
    },
    decorators: [
        story => (
            <Provider
                store={createStore(() => ({
                    countries: {
                        searchItems: [
                            { id: 'PG', countryCode: 'PG', countryName: 'PANGEA' },
                            { id: 'GB', countryCode: 'GB', countryName: 'BRITTANIA' }
                        ]
                    },
                    address: {
                        item: {
                            addressee: 'Mr Person',
                            addressee2: 'CEO of all people',
                            addressId: 123,
                            line1: '123 Sapien Street',
                            line2: 'Bipedal Bay',
                            line3: 'Humantown',
                            line4: 'Globeshire',
                            postCode: 'P01 7PS',
                            countryCode: 'PG',
                            countryName: 'Pangea'
                        }
                    }
                }))}
            >
                {providers(story)}
            </Provider>
        )
    ],
    component: AddressUtility
};

export const Default = args => <AddressUtility {...args} />;

Default.story = { name: 'default' };
Default.args = defaultArgs;

export const InDialogBox = args => (
    <Dialog open fullWidth maxWidth="md">
        <div
            style={{
                margin: '20px',
                padding: '50px'
            }}
        >
            <AddressUtility {...args} inDialogBox closeDialog={action('closeDialog')} />
        </div>
    </Dialog>
);

InDialogBox.story = { name: 'in Dialog Box' };
InDialogBox.args = defaultArgs;
