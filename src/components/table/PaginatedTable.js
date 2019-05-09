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
import EditIcon from '@material-ui/icons/Edit';
import { getSelfHref } from '../../utilities/Helpers';
import TablePaginationActionsWrapped from './TablePaginationActions';

function PaginatedTable({ page, pageLoad, pageSortedLoad, columnNames }) {
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
                    {columnNames.map(columnName => (
                        <TableCell sortDirection={localOrderBy === columnName.prop ? asc : false}>
                            <TableSortLabel
                                active={localOrderBy === columnName.prop}
                                direction={asc ? 'asc' : 'desc'}
                                onClick={() => createSortHandler(columnName.prop)}
                            >
                                {columnName.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {page.elements &&
                    page.elements.map((row, index) => (
                        // there are duplicates in the live database so this is a workaround
                        // we should not use the index as a key as it will impact on performance when sorting
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={row.propId + index}>
                            <TableRow
                                style={cursor}
                                hover
                                onClick={() => handleRowOnClick(row.propId)}
                            >
                                <TableCell>
                                    <Link key={row.propId} to={identifySelfLink(row.propId)}>
                                        <EditIcon />
                                    </Link>
                                </TableCell>
                                {row.props.map(cell => (
                                    <TableCell component="th" scope="row">
                                        {cell}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {rowOpen === row.propId && row.expandableInfo && (
                                <tr key={row.expandableInfo.propId}>
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
    page: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pageLoad: PropTypes.func.isRequired,
    pageSortedLoad: PropTypes.func.isRequired,
    columnNames: PropTypes.arrayOf(
        PropTypes.shape({ prop: PropTypes.string, label: PropTypes.string })
    ).isRequired,
    pagination: PropTypes.shape({})
};

PaginatedTable.defaultProps = {
    pagination: null
};

export default PaginatedTable;
