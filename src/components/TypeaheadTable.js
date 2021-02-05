import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/styles/makeStyles';
import Loading from './Loading';
import SearchInputField from './SearchInputField';
import InputField from './InputField';
import Title from './Title';
import useSearch from '../hooks/useSearch';
import utilities from '../utilities/index';
import SearchIcon from './SearchIcon';

const useStyles = makeStyles(theme => ({
    a: {
        textDecoration: 'none'
    },
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
    button: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}));

function TypeaheadTable({
    fetchItems,
    table,
    columnNames,
    title,
    loading,
    clearSearch,
    history,
    placeholder,
    label,
    debounce,
    searchOptions,
    queryString,
    minimumSearchTermLength,
    modal,
    links,
    disabled,
    onSelect,
    value
}) {
    const [searchTerm, setSearchTerm] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    useSearch(
        fetchItems,
        searchTerm,
        clearSearch,
        queryString,
        searchOptions,
        debounce,
        minimumSearchTermLength
    );

    const classes = useStyles();

    const handleSearchTermChange = (_propertyName, newValue) => {
        setSearchTerm(newValue);
    };

    const cursor = {
        cursor: 'pointer',
        textDecoration: 'none'
    };

    const handleClick = e => {
        if (modal) {
            setDialogOpen(false);
        }
        if (clearSearch) {
            clearSearch();
        }
        setSearchTerm(null);
        if (!links) {
            onSelect(e);
        }
    };

    const results = () => {
        if (table.rows.length > 0) {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            {columnNames.map(columnName => (
                                <TableCell key={columnName}>{columnName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.rows &&
                            table.rows.map(row => (
                                <TableRow
                                    style={cursor}
                                    onClick={() =>
                                        links
                                            ? history.push(utilities.getSelfHref(row))
                                            : handleClick(row)
                                    }
                                    hover
                                    key={row.id}
                                >
                                    {row.values.map(cell => (
                                        <TableCell key={cell.id} component="th" scope="row">
                                            {cell.value}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            );
        }
        return <Typography>No matching items</Typography>;
    };

    const renderTypeahead = () => (
        <>
            {title && <Title text={title} />}
            <SearchInputField
                placeholder={placeholder}
                onChange={handleSearchTermChange}
                type="search"
                label={label}
                variant="outlined"
                value={searchTerm}
                textFieldProps={{
                    autoFocus: true
                }}
            />
            {loading ? <Loading /> : results()}
        </>
    );

    if (modal) {
        return (
            <>
                <InputField
                    adornment={SearchIcon()}
                    textFieldProps={{
                        onClick: () => {
                            if (!disabled) {
                                setDialogOpen(true);
                                clearSearch();
                            }
                        },
                        disabled
                    }}
                    value={modal ? value : searchTerm}
                    label={label}
                    placeholder={placeholder}
                    onChange={modal ? () => setDialogOpen(true) : handleSearchTermChange}
                />
                <Dialog
                    data-testid="modal"
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    fullWidth
                    maxWidth="md"
                >
                    <div>
                        <IconButton
                            className={classes.pullRight}
                            aria-label="Close"
                            onClick={() => setDialogOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <div className={classes.dialog}>{renderTypeahead()}</div>
                    </div>
                </Dialog>
            </>
        );
    }

    return <> {renderTypeahead()}</>;
}

TypeaheadTable.propTypes = {
    table: PropTypes.shape({
        rows: PropTypes.arrayOf(
            PropTypes.shape({
                Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                values: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                        value: PropTypes.string
                    })
                )
            })
        ).isRequired
    }),
    columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    fetchItems: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    title: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    debounce: PropTypes.number,
    minimumSearchTermLength: PropTypes.number,
    queryString: PropTypes.string,
    searchOptions: PropTypes.string,
    modal: PropTypes.bool,
    links: PropTypes.bool,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string
};

TypeaheadTable.defaultProps = {
    title: null,
    loading: false,
    placeholder: '',
    table: { rows: [] },
    label: '',
    debounce: 500,
    minimumSearchTermLength: 1,
    queryString: '',
    searchOptions: '',
    modal: false,
    links: true,
    onSelect: null,
    disabled: false,
    value: null
};

export default TypeaheadTable;
