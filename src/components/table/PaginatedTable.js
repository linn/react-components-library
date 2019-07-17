import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import makeStyles from '@material-ui/styles/makeStyles';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getSelfHref } from '../../utilities/index';
import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles(theme => ({
    link: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    button: {
        maxWidth: theme.spacing(5),
        minWidth: theme.spacing(5),
        maxHeight: theme.spacing(3),
        minHeight: theme.spacing(3),
        padding: 0
    },
    exandedRow: {
        background: theme.palette.grey[100]
    },
    expandedTitleText: {
        fontWeight: theme.typography.fontWeightBold
    }
}));

function PaginatedTable({
    sortable,
    handleRowLinkClick,
    expandable,
    loading,
    columns,
    rows,
    pageOptions,
    setPageOptions,
    totalItemCount
}) {
    const [rowOpen, setRowOpen] = useState();

    const classes = useStyles();

    const handleRowOnClick = rowId => (rowOpen === rowId ? setRowOpen(null) : setRowOpen(rowId));

    const handleChangePage = (event, pge) => {
        setPageOptions(options => ({
            ...options,
            currentPage: pge
        }));
    };

    const handleChangeRowsPerPage = event => {
        const { value } = event.target;

        setPageOptions(options => ({
            ...options,
            rowsPerPage: parseInt(value, 10),
            currentPage: 0
        }));
    };

    const handleChangeOrderBy = property => {
        setPageOptions(options => ({
            ...options,
            orderBy: property,
            orderAscending: !options.orderAscending
        }));
    };

    const invalidElement = key =>
        key !== 'elements' && key !== 'links' && key !== 'href' && key !== 'id';

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {Object.keys(columns).map(key =>
                        sortable ? (
                            <TableCell
                                key={key}
                                sortDirection={
                                    pageOptions.orderBy === key && pageOptions.orderAscending
                                        ? 'asc'
                                        : 'desc'
                                }
                            >
                                <TableSortLabel
                                    active={pageOptions.orderBy === key}
                                    direction={pageOptions.orderAscending ? 'asc' : 'desc'}
                                    onClick={() => handleChangeOrderBy(key)}
                                >
                                    {columns[key]}
                                </TableSortLabel>
                            </TableCell>
                        ) : (
                            <TableCell>{columns[key]}</TableCell>
                        )
                    )}
                    {expandable && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>
            {loading ? (
                <TableCell colspan={columns.length + 1}>
                    <LinearProgress />
                </TableCell>
            ) : (
                <Fragment>
                    <TableBody>
                        {rows.map(row => (
                            <Fragment key={row.id}>
                                <TableRow
                                    className={classes.link}
                                    hover
                                    onClick={() =>
                                        expandable
                                            ? handleRowOnClick(row.id)
                                            : handleRowLinkClick(getSelfHref(row))
                                    }
                                >
                                    {Object.keys(row)
                                        .filter(key => invalidElement(key, row))
                                        .map(key => (
                                            <TableCell component="th" scope="row">
                                                {row[key] || '-'}
                                            </TableCell>
                                        ))}
                                    {expandable && (
                                        <TableCell>
                                            <Button
                                                classes={{ root: classes.button }}
                                                key={getSelfHref(row)}
                                                onClick={() => handleRowLinkClick(getSelfHref(row))}
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                                {expandable && rowOpen === row.id && row.elements && (
                                    <TableRow>
                                        <TableCell colspan={columns.length + 1}>
                                            <Table>
                                                {row.elements.map(el => (
                                                    <TableRow>
                                                        {Object.keys(el).map(key => (
                                                            <TableCell
                                                                classes={{
                                                                    root: classes.exandedRow
                                                                }}
                                                                size="small"
                                                            >
                                                                <Typography
                                                                    classes={{
                                                                        root:
                                                                            classes.expandedTitleText
                                                                    }}
                                                                    variant="caption"
                                                                >
                                                                    {key}:
                                                                </Typography>
                                                                <Typography variant="caption">
                                                                    {` ${el[key]}`}
                                                                </Typography>
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        ))}
                    </TableBody>
                    <TableFooter>
                        {totalItemCount && (
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    count={totalItemCount}
                                    rowsPerPage={pageOptions.rowsPerPage}
                                    page={pageOptions.currentPage}
                                    SelectProps={{
                                        native: true
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        )}
                    </TableFooter>
                </Fragment>
            )}
        </Table>
    );
}

PaginatedTable.propTypes = {
    sortable: PropTypes.bool,
    handleRowLinkClick: PropTypes.func.isRequired,
    expandable: PropTypes.bool,
    loading: PropTypes.bool,
    columns: PropTypes.shape({}).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pageOptions: PropTypes.shape({
        orderBy: PropTypes.string,
        orderAscending: PropTypes.bool,
        currentPage: PropTypes.number,
        rowsPerPage: PropTypes.number
    }).isRequired,
    setPageOptions: PropTypes.func.isRequired,
    totalItemCount: PropTypes.number
};

PaginatedTable.defaultProps = {
    sortable: false,
    expandable: false,
    loading: false,
    totalItemCount: 0
};

export default PaginatedTable;
