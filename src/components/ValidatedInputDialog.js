import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ThemeProvider from '@mui/styles/ThemeProvider';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import InputField from './InputField';
import useSearch from '../hooks/useSearch';
import Loading from './Loading';
import linnTheme from '../themes/linnTheme';

const valid = createTheme(
    adaptV4Theme({
        palette: {
            primary: {
                main: '#4BB543'
            },
            secondary: {
                main: '#FF9494'
            }
        }
    })
);

const invalid = createTheme(
    adaptV4Theme({
        palette: {
            primary: {
                main: '#FF9494'
            }
        }
    })
);
const useStyles = makeStyles((theme) => ({
    pullRight: {
        float: 'right'
    },
    dialog: {
        margin: theme.spacing(6),
        minWidth: theme.spacing(62)
    },
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

function ValidatedInputDialog({ title, loading, fetchItems, searchItems, clearSearch, onAccept }) {
    const [searchTerm, setSearchTerm] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    const classes = useStyles();

    useSearch(fetchItems, searchTerm, clearSearch);

    const handleOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleAccept = (accepted) => {
        onAccept(accepted);
        setDialogOpen(false);
    };

    const handleSearchTermChange = (...args) => {
        setSearchTerm(args[1]);
    };

    const getTheme = () => {
        if (!searchTerm || loading) return linnTheme;
        return searchItems.length === 1 ? valid : invalid;
    };

    const inputValid = () => searchItems.length === 1;

    return (
        <>
            <Tooltip title={title}>
                <Button
                    color="primary"
                    aria-label="Search"
                    onClick={handleOpen}
                    variant="outlined"
                    className={classes.button}
                >
                    <EditIcon />
                </Button>
            </Tooltip>

            <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
                <div>
                    <IconButton
                        className={classes.pullRight}
                        aria-label="Close"
                        onClick={handleClose}
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.dialog}>
                        <Typography variant="h5" gutterBottom>
                            {title}
                        </Typography>
                        <ThemeProvider theme={getTheme()}>
                            <InputField
                                onChange={handleSearchTermChange}
                                label=""
                                value={searchTerm}
                            />
                        </ThemeProvider>
                        {inputValid() && (
                            <ThemeProvider theme={valid}>
                                <IconButton
                                    aria-label="Close"
                                    onClick={() => handleAccept(searchItems[0])}
                                    size="large"
                                >
                                    <DoneIcon color="primary" />
                                </IconButton>
                            </ThemeProvider>
                        )}
                        {searchTerm && (
                            <IconButton
                                aria-label="Close"
                                onClick={() => {
                                    clearSearch();
                                    setSearchTerm('');
                                }}
                                size="large"
                            >
                                <CloseIcon />
                            </IconButton>
                        )}
                        {loading && <Loading />}
                    </div>
                </div>
            </Dialog>
        </>
    );
}

ValidatedInputDialog.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    fetchItems: PropTypes.func.isRequired,
    searchItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onAccept: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
};

ValidatedInputDialog.defaultProps = {
    title: 'Start typing...',
    loading: false
};

export default ValidatedInputDialog;
