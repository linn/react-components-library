import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Loading from './Loading.js';
import InputField from './InputField.js';

function Search({
    propertyName,
    label,
    value = null,
    handleValueChange,
    disabled = false,
    search,
    searchResults = [],
    loading = false,
    priorityFunction = null,
    onResultSelect,
    resultLimit = null,
    resultsInModal = false,
    clearSearch,
    searchOnEnter = true,
    onKeyPressFunctions = [],
    helperText = 'PRESS ENTER TO SEARCH',
    autoFocus = true,
    visible = true,
    displayChips = false,
    fullWidth = false,
    handleOnBlur = null
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
            <Stack spacing={3} direction="row">
                <Typography
                    data-testid="result"
                    sx={{ fontWeight: theme => theme.typography.fontWeightBold }}
                >
                    {item.name}
                </Typography>
                <Typography sx={{ color: theme => theme.palette.text.primary }}>
                    {item.description}
                </Typography>
                {displayChips && (
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
                )}
            </Stack>
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
                        <Box key={r.id}>
                            {resultItem(r)}
                            <Divider component="li" />
                        </Box>
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
                    },
                    onBlur: handleOnBlur ? handleOnBlur : null
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

export default Search;
