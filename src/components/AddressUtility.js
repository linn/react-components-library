import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SaveBackCancelButtons from './SaveBackCancelButtons.js';
import InputField from './InputField.js';
import Loading from './Loading.js';
import Search from './Search.js';

function AddressUtility({
    createAddress,
    createAddressLoading = false,
    selectAddress,
    searchCountries,
    searchAddresses,
    countriesSearchResults = [],
    countriesSearchLoading = false,
    addressSearchResults = [],
    addressSearchLoading = false,
    clearAddressesSearch = () => {},
    clearCountriesSearch = () => {},
    defaultAddressee = false,
    isActive,
    setIsActive
}) {
    const [address, setAddress] = useState({ addressee: defaultAddressee });
    const [addressSearchTerm, setAddressSearchTerm] = useState('');
    const [countrySearchTerm, setCountrySearchTerm] = useState('');
    // a country code typed and tabbed out of, waiting for the country search's results
    const [awaitedCountryCode, setAwaitedCountryCode] = useState(null);

    const pickCountry = country => {
        setCountrySearchTerm(country.countryCode);
        setAddress(a => ({
            ...a,
            countryCode: country.countryCode,
            countryName: country.countryName
        }));
    };

    const countryWithCode = code =>
        (countriesSearchResults ?? []).find(
            c => `${c.countryCode ?? ''}`.toUpperCase() === code.toUpperCase()
        );

    // Tab on the country: the country with exactly that code (any case), from the results there
    // already or, once they come, from a search for it. Nothing is picked when there's none.
    const lookUpCountryCode = () => {
        const code = `${countrySearchTerm ?? ''}`.trim();
        if (!code) {
            return;
        }
        const found = countryWithCode(code);
        if (found) {
            pickCountry(found);
            return;
        }
        setAwaitedCountryCode(code);
        searchCountries(code);
    };

    useEffect(() => {
        if (!awaitedCountryCode) {
            return;
        }
        const found = countryWithCode(awaitedCountryCode);
        if (found) {
            pickCountry(found);
            setAwaitedCountryCode(null);
        }
        // countryWithCode and pickCountry only read the results and set state
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [awaitedCountryCode, countriesSearchResults]);

    const handleFieldChange = (propertyName, newValue) => {
        setAddress(a => ({ ...a, [propertyName]: newValue }));
    };

    const close = () => {
        setIsActive(false);
    };

    const open = () => {
        setIsActive(true);
    };

    const chips = a => {
        const result = [{ text: a.addressId }, { text: a.addressee }, { text: a.line1 }];
        if (a.postCode) {
            result.push({ text: a.postCode });
        }
        if (a.countryCode) {
            result.push({ text: a.countryCode });
        }
        return result;
    };

    return (
        <>
            <Grid container>
                <Grid size={12}>
                    <Button variant="outlined" onClick={open}>
                        Create Or Look Up Address
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={isActive} maxWidth="md">
                <Box
                    sx={{
                        position: 'relative',
                        margin: 6,
                        minWidth: 62
                    }}
                >
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8
                        }}
                        aria-label="Close"
                        onClick={close}
                    >
                        <Close />
                    </IconButton>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <Typography variant="h6">Create or Look Up Address</Typography>
                        </Grid>
                        <Grid size={12}>
                            <Search
                                propertyName="salesAccount"
                                label="Look up an address"
                                value={addressSearchTerm}
                                handleValueChange={(_, newVal) => setAddressSearchTerm(newVal)}
                                search={searchAddresses}
                                searchResults={addressSearchResults.map(a => ({
                                    ...a,
                                    chips: chips(a)
                                }))}
                                loading={addressSearchLoading}
                                displayChips
                                resultsInModal
                                onResultSelect={x => {
                                    selectAddress(x);
                                    close();
                                }}
                                clearSearch={clearAddressesSearch}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="subtitle1">
                                Or Enter details and click save to create a new address
                            </Typography>
                        </Grid>
                        {createAddressLoading ? (
                            <Loading />
                        ) : (
                            <>
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.addressee}
                                        label="Addressee"
                                        propertyName="addressee"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.addressee2}
                                        label="Addressee 2"
                                        propertyName="addressee2"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.line1}
                                        label="Line 1"
                                        propertyName="line1"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.line2}
                                        label="Line 2"
                                        propertyName="line2"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.line3}
                                        label="Line 3"
                                        propertyName="line3"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.line4}
                                        label="Line 4"
                                        propertyName="line4"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.postCode}
                                        label="Postcode"
                                        propertyName="postCode"
                                        onChange={handleFieldChange}
                                    />
                                </Grid>
                                <Grid size={4} />
                                <Grid size={4}>
                                    <Search
                                        propertyName="countryCode"
                                        label="Look up Countries"
                                        value={countrySearchTerm}
                                        handleValueChange={(_, newVal) => {
                                            setCountrySearchTerm(newVal);
                                            setAwaitedCountryCode(null);
                                        }}
                                        search={searchCountries}
                                        onKeyPressFunctions={[
                                            { keyCode: 9, action: lookUpCountryCode }
                                        ]}
                                        helperText="The code and Tab, or part of the name and Enter"
                                        searchResults={countriesSearchResults}
                                        loading={countriesSearchLoading}
                                        autoFocus={false}
                                        resultsInModal
                                        priorityFunction={(i, searchTerm) => {
                                            if (i.countryCode === searchTerm?.toUpperCase()) {
                                                return 1;
                                            }
                                            return 0;
                                        }}
                                        onResultSelect={pickCountry}
                                        clearSearch={clearCountriesSearch}
                                    />
                                </Grid>
                                <Grid size={8}>
                                    <InputField
                                        fullWidth
                                        value={address?.countryName}
                                        label="Name"
                                        propertyName="countryName"
                                        onChange={() => {}}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <SaveBackCancelButtons
                                        saveDisabled={!address?.addressee || !address?.countryCode}
                                        backClick={close}
                                        saveClick={() => {
                                            createAddress(address);
                                        }}
                                        cancelClick={close}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Box>
            </Dialog>
        </>
    );
}

export default AddressUtility;
