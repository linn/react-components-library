import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';
import makeStyles from '@mui/styles/makeStyles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import utilities from '../../utilities/index';
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
                            <TableCell key={key}>{columns[key]}</TableCell>
                        )
                    )}
                    {expandable && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            {loading ? (
                <TableBody>
                    <TableCell colspan={Object.keyscolumns().length + 1}>
                        <LinearProgress />
                    </TableCell>{' '}
                </TableBody>
            ) : (
                <Fragment>
                    <TableBody>
                        {rows.map(row => (
                            <Fragment key={row.id}>
                                <TableRow
                                    key={row.id}
                                    className={classes.link}
                                    hover
                                    onClick={() =>
                                        expandable
                                            ? handleRowOnClick(row.id)
                                            : handleRowLinkClick(utilities.getSelfHref(row))
                                    }
                                >
                                    {Object.keys(row)
                                        .filter(key => invalidElement(key, row))
                                        .map(key => (
                                            <TableCell key={key} component="th" scope="row">
                                                {row[key] || '-'}
                                            </TableCell>
                                        ))}
                                    {expandable && (
                                        <TableCell>
                                            <Button
                                                classes={{ root: classes.button }}
                                                key={utilities.getSelfHref(row)}
                                                onClick={() =>
                                                    handleRowLinkClick(utilities.getSelfHref(row))
                                                }
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
                                    <Fragment>
                                        {row.elements.map(el => (
                                            <TableRow
                                                colSpan={Object.keys(columns).length + 1}
                                                key={el.id}
                                            >
                                                {Object.keys(el)
                                                    .filter(k => k !== 'id')
                                                    .map(key => (
                                                        <TableCell
                                                            key={key}
                                                            classes={{
                                                                root: classes.exandedRow
                                                            }}
                                                            size="small"
                                                        >
                                                            <Typography
                                                                classes={{
                                                                    root: classes.expandedTitleText
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
                                    </Fragment>
                                )}
                            </Fragment>
                        ))}
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
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        )}
                    </TableBody>
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
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            elements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
                })
            )
        })
    ),
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
    rows: [],
    sortable: false,
    expandable: false,
    loading: false,
    totalItemCount: 0
};

export default PaginatedTable;
