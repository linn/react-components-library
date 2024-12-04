/* eslint-disable react/jsx-props-no-spreading */
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import InputField from './InputField';
import Loading from './Loading';

function Search({
    propertyName,
    label,
    value,
    handleValueChange,
    disabled,
    search,
    searchResults,
    loading,
    priorityFunction,
    onResultSelect,
    resultLimit,
    resultsInModal,
    clearSearch,
    searchOnEnter,
    onKeyPressFunctions,
    helperText,
    autoFocus,
    visible,
    displayChips,
    fullWidth
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const countMatchingCharacters = (item, searchTerm) => {
        let count = 0;
        if (searchTerm) {
            for (let i = 0; i < searchTerm.length; i += 1) {
                if (item.name.toUpperCase()[i] === searchTerm.toUpperCase()[i]) {
                    count += 1;
                }
            }
        }
        return count;
    };

    const resultItem = item => (
        <ListItem
            sx={{ padding: theme => theme.spacing(2) }}
            onClick={() => {
                clearSearch();
                if (resultsInModal) {
                    setDialogOpen(false);
                }
                onResultSelect(item);
                setHasSearched(false);
            }}
        >
            <Grid container spacing={3}>
                <Grid xs={3}>
                    <Typography data-testid="result" sx={{ fontWeight: theme => theme.typography.fontWeightBold }}>
                        {item.name}
                    </Typography>
                </Grid>
                <Grid xs={displayChips ? 3 : 9}>
                    <Typography sx={{ color: theme => theme.palette.text.primary }}>
                        {item.description}
                    </Typography>
                </Grid>
                {displayChips && (
                    <Grid xs={6}>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={1}
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                            {item.chips?.map(c => (
                                <Chip
                                    id={c.text}
                                    key={c.text}
                                    label={c.text}
                                    sx={{ backgroundColor: c.color }}
                                />
                            ))}
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </ListItem>
    );

    const priority = (item, searchTerm) => {
        if (priorityFunction === 'closestMatchesFirst') {
            return countMatchingCharacters(item, searchTerm);
        }
        return priorityFunction(item, searchTerm);
    };

    const results = () => {
        if (loading) {
            return <Loading />;
        }

        let result = searchResults;

        if (priorityFunction) {
            result = result
                .map(i => ({
                    ...i,
                    priority: priority(i, value)
                }))
                .sort((a, b) => b.priority - a.priority);
        }

        if (resultLimit) {
            result = result.slice(0, resultLimit);
        }

        if (result?.length > 0 || !hasSearched) {
            return (
                <List dense>
                    {result.map(r => (
                        <Fragment key={r.id}>
                            {resultItem(r)}
                            <Divider component="li" />
                        </Fragment>
                    ))}
                </List>
            );
        }
        return <Typography>No matching items</Typography>;
    };

    return (
        <>
            <InputField
                visible={visible}
                value={value}
                propertyName={propertyName}
                label={label}
                autoFocus={autoFocus}
                adornment={<SearchIcon />}
                onChange={handleValueChange}
                helperText={helperText}
                fullWidth={fullWidth}
                textFieldProps={{
                    disabled,
                    onKeyDown: data => {
                        if (searchOnEnter && data.keyCode === 13) {
                            if (resultsInModal) {
                                setDialogOpen(true);
                            }
                            search(value);
                            setHasSearched(true);
                        }
                        onKeyPressFunctions.forEach(element => {
                            if (data.keyCode === element.keyCode) {
                                element.action();
                            }
                        });
                    }
                }}
            />
            {resultsInModal ? (
                <Dialog data-testid="modal" open={dialogOpen} fullWidth maxWidth="md">
                    <Box>
                        <IconButton
                            sx={{
                                float: 'right'
                            }}
                            aria-label="Close"
                            onClick={() => setDialogOpen(false)}
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box
                            sx={{
                                margin: theme => theme.spacing(6),
                                minWidth: theme => theme.spacing(62)
                            }}
                        >
                            {loading ? <Loading /> : results()}
                        </Box>
                    </Box>
                </Dialog>
            ) : (
                results()
            )}
        </>
    );
}

Search.propTypes = {
    propertyName: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool,
    label: PropTypes.string.isRequired,
    clearSearch: PropTypes.func.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    onResultSelect: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    searchResults: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    priorityFunction: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    resultLimit: PropTypes.number,
    resultsInModal: PropTypes.bool,
    searchOnEnter: PropTypes.bool,
    onKeyPressFunctions: PropTypes.arrayOf(
        PropTypes.shape({ keyCode: PropTypes.number, action: PropTypes.func })
    ),
    helperText: PropTypes.string,
    visible: PropTypes.bool,
    displayChips: PropTypes.bool,
    fullWidth: PropTypes.bool
};

Search.defaultProps = {
    searchOnEnter: true,
    onKeyPressFunctions: [],
    autoFocus: true,
    value: null,
    disabled: false,
    searchResults: [],
    loading: false,
    priorityFunction: null,
    resultLimit: null,
    resultsInModal: false,
    helperText: 'PRESS ENTER TO SEARCH',
    visible: true,
    displayChips: false,
    fullWidth: false
};

export default Search;
