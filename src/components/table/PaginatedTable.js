import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableHead,
    TableBody,
    TablePagination,
    TableFooter,
    TableRow,
    TableCell,
    TableSortLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { getSelfHref } from '../../utilities/index';
import TablePaginationActions from './TablePaginationActions';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5)
    }
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions
);

function PaginatedTable({ page, sortable, pageLoad, pageSortedLoad, columnNames }) {
    const [rowOpen, setRowOpen] = useState();
    const [localPage, setLocalPage] = useState(0);
    const [localOrderBy, setOrderBy] = useState();
    const [asc, setAsc] = useState(false);
    const [rowsPerPage, setRowsPerpage] = useState(5);

    const handleRowOnClick = salesPackageId =>
        rowOpen === salesPackageId ? setRowOpen(null) : setRowOpen(salesPackageId);

    const cursor = {
        cursor: 'pointer'
    };

    const identifySelfLink = row => getSelfHref(row);

    const handleChangePage = (event, pge) => {
        setLocalPage(pge);
        pageLoad(pge + 1, rowsPerPage); // page number must be incremented because the starting index on the server is 1
    };

    const handleChangeRowsPerPage = event => {
        setLocalPage(0);
        setRowsPerpage(event.target.value);
        pageLoad(localPage + 1, event.target.value);
    };

    const createSortHandler = property => {
        setOrderBy(property);
        setAsc(!asc);
        pageSortedLoad(localPage + 1, rowsPerPage, property, asc);
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columnNames.map(columnName =>
                        sortable ? (
                            <TableCell
                                sortDirection={localOrderBy === columnName.value ? asc : false}
                            >
                                <TableSortLabel
                                    active={localOrderBy === columnName.value}
                                    direction={asc ? 'asc' : 'desc'}
                                    onClick={() => createSortHandler(columnName.value)}
                                >
                                    {columnName.label}
                                </TableSortLabel>
                            </TableCell>
                        ) : (
                            <TableCell>{columnName.label}</TableCell>
                        )
                    )}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {page.rows &&
                    page.rows.map(row => (
                        <Fragment key={row.Id}>
                            <TableRow style={cursor} hover onClick={() => handleRowOnClick(row.Id)}>
                                {row.values.map(cell => (
                                    <TableCell component="th" scope="row">
                                        {cell}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Link key={row.Id} to={() => identifySelfLink(row)}>
                                        <EditIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                            {rowOpen === row.Id && row.expandableInfo && (
                                <tr key={row.expandableInfo.Id}>
                                    {row.expandableInfo.elements.map(element => (
                                        <TableCell>
                                            {element.label} {element.value}
                                        </TableCell>
                                    ))}
                                </tr>
                            )}
                        </Fragment>
                    ))}
            </TableBody>
            <TableFooter>
                {page.totalItemCount && (
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            count={page.totalItemCount}
                            rowsPerPage={rowsPerPage}
                            page={localPage}
                            SelectProps={{
                                native: true
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                )}
            </TableFooter>
        </Table>
    );
}

PaginatedTable.propTypes = {
    page: PropTypes.shape({
        rows: PropTypes.arrayOf(
            PropTypes.shape({
                Id: PropTypes.string,
                values: PropTypes.arrayOf(PropTypes.string),
                expandableInfo: PropTypes.shape({
                    Id: PropTypes.string,
                    elements: PropTypes.arrayOf(
                        PropTypes.shape({
                            label: PropTypes.string,
                            value: PropTypes.string
                        })
                    )
                })
            })
        ).isRequired,
        totalItemCount: PropTypes.number.isRequired
    }).isRequired,
    sortable: PropTypes.bool,
    pageLoad: PropTypes.func.isRequired,
    pageSortedLoad: PropTypes.func.isRequired,
    columnNames: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
    ).isRequired
};

PaginatedTable.defaultProps = {
    sortable: false
};

export default PaginatedTable;
