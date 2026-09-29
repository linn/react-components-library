import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
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
    showResultsList = true,
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
    const [resultsHidden, setResultsHidden] = useState(false);
    const listRef = useRef(null);

    const focusInput = () => {
        setTimeout(() => {
            document.getElementById(propertyName)?.focus();
        }, 0);
    };

    const focusResultAt = index => {
        const items = listRef.current?.querySelectorAll('[data-search-result]');
        if (items?.length) {
            items[Math.max(0, Math.min(index, items.length - 1))].focus();
        }
    };

    // When the results modal opens (and results are ready), move focus straight
    // onto the first result so it can be navigated and selected by keyboard.
    useEffect(() => {
        if (resultsInModal && dialogOpen && !loading) {
            const timer = setTimeout(() => focusResultAt(0), 0);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [resultsInModal, dialogOpen, loading]);

    const hideResults = () => {
        if (resultsInModal) {
            setDialogOpen(false);
        } else {
            setResultsHidden(true);
        }
        focusInput();
    };

    const handleQueryChange = (name, newValue) => {
        // Starting a new query should bring back a list the user dismissed with
        // Escape. This covers searchOnEnter={false}, where there is no Enter
        // press to reset the hidden state.
        setResultsHidden(false);
        handleValueChange(name, newValue);
    };

    const handleListKeyDown = event => {
        // The handler sits on both the results List and (for the modal) the
        // Dialog. Stop propagation once handled so a keypress originating on a
        // result isn't processed again as it bubbles up, which would skip items.
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            hideResults();
            return;
        }
        const items = listRef.current?.querySelectorAll('[data-search-result]');
        if (!items?.length) {
            return;
        }
        const currentIndex = Array.from(items).indexOf(document.activeElement);
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            event.stopPropagation();
            focusResultAt(currentIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            if (currentIndex <= 0) {
                // In the modal the input sits outside the dialog's focus trap,
                // so returning focus to it is unreliable — keep focus on the
                // first result. Inline, hop back up to the input.
                if (resultsInModal) {
                    focusResultAt(0);
                } else {
                    focusInput();
                }
            } else {
                focusResultAt(currentIndex - 1);
            }
        }
    };

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

    const selectResult = item => {
        clearSearch();
        if (resultsInModal) {
            setDialogOpen(false);
        }
        onResultSelect(item);
        setHasSearched(false);
        focusInput();
    };

    const resultItem = item => (
        <ListItemButton
            data-search-result
            tabIndex={-1}
            sx={{ padding: theme => theme.spacing(2) }}
            onClick={() => selectResult(item)}
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
        </ListItemButton>
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
                <List dense ref={listRef} onKeyDown={handleListKeyDown}>
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
                onChange={handleQueryChange}
                helperText={helperText}
                fullWidth={fullWidth}
                textFieldProps={{
                    disabled,
                    onKeyDown: data => {
                        if (searchOnEnter && data.keyCode === 13) {
                            if (resultsInModal && showResultsList) {
                                setDialogOpen(true);
                            }
                            setResultsHidden(false);
                            search(value);
                            setHasSearched(true);
                        } else if (data.key === 'Escape') {
                            hideResults();
                        } else if (data.key === 'ArrowDown' && showResultsList) {
                            data.preventDefault();
                            focusResultAt(0);
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
            {showResultsList &&
                (resultsInModal ? (
                    <Dialog
                        data-testid="modal"
                        open={dialogOpen}
                        onKeyDown={handleListKeyDown}
                        fullWidth
                        maxWidth="md"
                    >
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
                    !resultsHidden && results()
                ))}
        </>
    );
}

export default Search;
