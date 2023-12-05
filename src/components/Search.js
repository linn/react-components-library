import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import InputField from './InputField';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
    nameText: {
        fontWeight: theme.typography.fontWeightBold
    },
    bodyText: {
        color: theme.palette.text.primary
    },
    pullRight: {
        float: 'right'
    },

    dialog: {
        margin: theme.spacing(6),
        minWidth: theme.spacing(62)
    },
    pad: { padding: theme.spacing(2) }
}));

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
    displayChips
}) {
    const classes = useStyles();
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
            className={classes.pad}
            button
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
                <Grid item xs={3}>
                    <Typography classes={{ root: classes.nameText }}>{item.name}</Typography>
                </Grid>
                <Grid item xs={displayChips ? 3 : 9}>
                    <Typography classes={{ root: classes.bodyText }}>{item.description}</Typography>
                </Grid>
                {displayChips && (
                    <Grid item xs={6}>
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
                                    label={c.text}
                                    style={{ backgroundColor: c.color }}
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
                .sort((a, b) => {
                    if (a.priority > b.priority) {
                        return -1;
                    }
                    if (a.priority < b.priority) {
                        return 1;
                    }
                    return 0;
                });
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
                    <div>
                        <IconButton
                            className={classes.pullRight}
                            aria-label="Close"
                            onClick={() => setDialogOpen(false)}
                            size="large"
                        >
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.dialog}>{loading ? <Loading /> : results()}</div>
                    </div>
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
    displayChips: PropTypes.bool
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
    displayChips: false
};

export default Search;
