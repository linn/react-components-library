import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import makeStyles from '@material-ui/styles/makeStyles';
import { formatCamelCaseToTitleCase, getSelfHref } from '../../utilities/index';
import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles(() => ({
    link: {
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

function PaginatedTable({
    page,
    sortable,
    pageLoad,
    pageSortedLoad,
    handleRowLinkClick,
    expandable,
    loading
}) {
    const [rowOpen, setRowOpen] = useState();
    const [localPage, setLocalPage] = useState(0);
    const [localOrderBy, setOrderBy] = useState({ property: '', asc: null });
    const [rowsPerPage, setRowsPerpage] = useState(10);

    const classes = useStyles();

    useEffect(() => {
        if (localOrderBy && localOrderBy.property) {
            pageSortedLoad(localPage + 1, rowsPerPage, localOrderBy.property, localOrderBy.asc);
        }
    }, [localOrderBy, localPage, rowsPerPage, pageSortedLoad]);

    const handleRowOnClick = rowId => (rowOpen === rowId ? setRowOpen(null) : setRowOpen(rowId));

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
        setOrderBy(s => ({ property, asc: !s.asc }));
    };

    const invalidElement = (key, elements) =>
        key !== 'elements' &&
        key !== 'links' &&
        key !== 'href' &&
        key !== 'id' &&
        (typeof elements[key] === 'string' ||
            typeof elements[key] === 'number' ||
            elements[key] === null);

    return (
        <Table size="small">
            {page.elements.length ? (
                <TableHead>
                    <TableRow>
                        {Object.keys(page.elements[0])
                            .filter(key => invalidElement(key, page.elements[0]))
                            .map(key =>
                                sortable ? (
                                    <TableCell
                                        key={key}
                                        sortDirection={
                                            localOrderBy.property === key ? localOrderBy.asc : false
                                        }
                                    >
                                        <TableSortLabel
                                            active={localOrderBy.property === key}
                                            direction={localOrderBy.asc ? 'asc' : 'desc'}
                                            onClick={() => createSortHandler(key)}
                                        >
                                            {formatCamelCaseToTitleCase(key)}
                                        </TableSortLabel>
                                    </TableCell>
                                ) : (
                                    <TableCell>{formatCamelCaseToTitleCase(key)}</TableCell>
                                )
                            )}
                        {expandable && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
            ) : (
                <TableHead />
            )}
            {loading ? (
                <TableCell
                    colspan={
                        page.elements.length
                            ? Object.keys(page.elements[0]).filter(key =>
                                  invalidElement(key, page.elements[0])
                              ).length + 1
                            : null
                    }
                >
                    <LinearProgress />
                </TableCell>
            ) : (
                <Fragment>
                    {page.elements &&
                        page.elements.map(element => (
                            <TableBody>
                                <TableRow
                                    className={classes.link}
                                    hover
                                    onClick={() =>
                                        expandable
                                            ? handleRowOnClick(element.id)
                                            : handleRowLinkClick(getSelfHref(element))
                                    }
                                >
                                    {Object.keys(element)
                                        .filter(key => invalidElement(key, element))
                                        .map(key => (
                                            <TableCell component="th" scope="row">
                                                {element[key]}
                                            </TableCell>
                                        ))}
                                    {expandable && (
                                        <TableCell>
                                            <Button
                                                key={getSelfHref(element)}
                                                onClick={() =>
                                                    handleRowLinkClick(getSelfHref(element))
                                                }
                                                size="small"
                                                variant="outlined"
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </Button>
                                        </TableCell>
                                    )}
                                </TableRow>
                                {expandable &&
                                    rowOpen === element.id &&
                                    element.elements &&
                                    element.elements.map(el => (
                                        <tr>
                                            {Object.keys(el).map(key => (
                                                <TableCell>
                                                    {formatCamelCaseToTitleCase(key)}: {el[key]}
                                                </TableCell>
                                            ))}
                                        </tr>
                                    ))}
                            </TableBody>
                        ))}
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
    page: PropTypes.shape({
        elements: PropTypes.arrayOf(
            PropTypes.shape({
                Id: PropTypes.string,
                values: PropTypes.arrayOf(PropTypes.string),
                elements: PropTypes.arrayOf(PropTypes.shape({}))
            })
        ).isRequired,
        totalItemCount: PropTypes.number.isRequired
    }).isRequired,
    sortable: PropTypes.bool,
    pageLoad: PropTypes.func.isRequired,
    pageSortedLoad: PropTypes.func.isRequired,
    handleRowLinkClick: PropTypes.func.isRequired,
    expandable: PropTypes.bool,
    loading: PropTypes.bool
};

PaginatedTable.defaultProps = {
    sortable: false,
    expandable: false,
    loading: false
};

export default PaginatedTable;
