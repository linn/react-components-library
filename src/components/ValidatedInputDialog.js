import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import { InputField, useSearch, Loading, linnTheme } from '../../index';

const valid = createMuiTheme({
    palette: {
        primary: {
            main: '#4BB543'
        },
        secondary: {
            main: '#FF9494'
        }
    }
});

const invalid = createMuiTheme({
    palette: {
        primary: {
            main: '#FF9494'
        }
    }
});
const useStyles = makeStyles(theme => ({
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

    const handleAccept = accepted => {
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
        <Fragment>
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
                                >
                                    <DoneIcon color="primary" />
                                </IconButton>
                            </ThemeProvider>
                        )}
                        <IconButton
                            aria-label="Close"
                            onClick={() => {
                                clearSearch();
                                setSearchTerm('');
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {loading ? <Loading /> : <Fragment />}
                    </div>
                </div>
            </Dialog>
        </Fragment>
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
