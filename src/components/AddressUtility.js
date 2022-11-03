import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Page from './Page';
import SaveBackCancelButtons from './SaveBackCancelButtons';
import collectionSelectorHelpers from '../selectors/collectionSelectorHelpers';
import Typeahead from './Typeahead';
import InputField from './InputField';
import SnackbarMessage from './SnackbarMessage';
import itemSelectorHelpers from '../selectors/itemSelectorHelpers';
import Loading from './Loading';

function AddressUtility({
    inDialogBox,
    closeDialog,
    addressee,
    history,
    config,
    addressActions,
    countriesActions,
    backUrl
}) {
    const dispatch = useDispatch();
    const countriesSearchResults = useSelector(state =>
        collectionSelectorHelpers.getSearchItems(
            state.countries,
            100,
            'countryCode',
            'countryCode',
            'countryName'
        )
    );
    const countriesSearchLoading = useSelector(state =>
        collectionSelectorHelpers.getSearchLoading(state.countries)
    );
    const searchCountries = searchTerm => dispatch(countriesActions.search(searchTerm));

    const [address, setAddress] = useState({});
    const snackbarVisible = useSelector(state =>
        itemSelectorHelpers.getSnackbarVisible(state.address)
    );
    const loading = useSelector(state => itemSelectorHelpers.getItemLoading(state.address));
    const item = useSelector(state => itemSelectorHelpers.getItem(state.address));
    const [editStatus, setEditStatus] = useState('view');
    useEffect(() => {
        if (item?.addressId) {
            setAddress(item);
        }
        if (addressee) {
            setAddress(a => ({ ...a, addressee }));
        }
    }, [item, addressee]);

    const handleFieldChange = (propertyName, newValue) => {
        setEditStatus('edit');
        setAddress(a => ({ ...a, [propertyName]: newValue }));
    };

    const content = () =>
        loading ? (
            <Loading />
        ) : (
            <Grid container spacing={3}>
                <SnackbarMessage
                    visible={snackbarVisible}
                    onClose={() => dispatch(addressActions.setSnackbarVisible(false))}
                    message="Save Successful"
                />
                <Grid item xs={12}>
                    <Typography variant="h6">Address Utility</Typography>
                </Grid>
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.addressee}
                        label="Addressee"
                        propertyName="addressee"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.addressee2}
                        label="Addressee 2"
                        propertyName="addressee2"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.line1}
                        label="Line 1"
                        propertyName="line1"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.line2}
                        label="Line 2"
                        propertyName="line2"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.line3}
                        label="Line 3"
                        propertyName="line3"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.line4}
                        label="Line 4"
                        propertyName="line4"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.postCode}
                        label="Postcode"
                        propertyName="postCode"
                        onChange={handleFieldChange}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Typeahead
                        onSelect={newValue => {
                            setAddress(a => ({
                                ...a,
                                countryCode: newValue.countryCode,
                                countryName: newValue.countryName
                            }));
                        }}
                        label="Country Lookup"
                        modal
                        propertyName="countryCode"
                        items={countriesSearchResults}
                        value={address?.countryCode}
                        loading={countriesSearchLoading}
                        fetchItems={searchCountries}
                        links={false}
                        priorityFunction={(i, searchTerm) => {
                            if (i.countryCode === searchTerm?.toUpperCase()) {
                                return 1;
                            }
                            return 0;
                        }}
                        text
                        placeholder="Search by Name or Code"
                        minimumSearchTermLength={2}
                        clearSearch={() => {}}
                    />
                </Grid>
                <Grid item xs={8}>
                    <InputField
                        fullWidth
                        value={address?.countryName}
                        label="Name"
                        propertyName="countryName"
                        onChange={() => {}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SaveBackCancelButtons
                        saveDisabled={
                            editStatus === 'view' || !address?.addressee || !address?.countryCode
                        }
                        backClick={() => (closeDialog ? closeDialog() : history.push(backUrl))}
                        saveClick={() => dispatch(addressActions.add(address))}
                        cancelClick={() => {
                            setEditStatus('view');
                            return closeDialog ? closeDialog() : setAddress({});
                        }}
                    />
                </Grid>
            </Grid>
        );
    return (
        <>
            {inDialogBox ? (
                content()
            ) : (
                <Page history={history} homeUrl={config.appRoot}>
                    {content()}
                </Page>
            )}
        </>
    );
}

AddressUtility.propTypes = {
    inDialogBox: PropTypes.bool,
    closeDialog: PropTypes.func,
    addressee: PropTypes.string,
    countriesActions: PropTypes.shape({ search: PropTypes.func }).isRequired,
    addressActions: PropTypes.shape({ add: PropTypes.func, setSnackbarVisible: PropTypes.func })
        .isRequired,
    history: PropTypes.shape({ push: PropTypes.func }),
    config: PropTypes.shape({ appRoot: PropTypes.string }),
    backUrl: PropTypes.string
};
AddressUtility.defaultProps = {
    inDialogBox: false,
    closeDialog: null,
    addressee: null,
    history: null,
    config: null,
    backUrl: null
};
export default AddressUtility;
