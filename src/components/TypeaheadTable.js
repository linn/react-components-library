import React, { Fragment, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Loading from './Loading';
import SearchInputField from './SearchInputField';
import Title from './Title';
import useSearch from '../hooks/useSearch';
import utilities from '../utilities';

function TypeaheadTable({
    fetchItems,
    table,
    columnNames,
    title,
    loading,
    clearSearch,
    history,
    placeholder
}) {
    const [searchTerm, setSearchTerm] = useState();
    useSearch(fetchItems, searchTerm, clearSearch);

    const handleSearchTermChange = (_propertyName, newValue) => {
        setSearchTerm(newValue);
    };

    const cursor = {
        cursor: 'pointer',
        textDecoration: 'none'
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
                                    onClick={() => history.push(utilities.getSelfHref(row))}
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

    return (
        <Fragment>
            {title && <Title text={title} />}
            <SearchInputField
                placeholder={placeholder}
                onChange={handleSearchTermChange}
                type="search"
                label="Search Works Orders by Part Number"
                variant="outlined"
                value={searchTerm}
                style={{ paddingTop: '8px' }}
            />
            {loading ? <Loading /> : results()}
        </Fragment>
    );
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
    placeholder: PropTypes.string
};

TypeaheadTable.defaultProps = {
    title: null,
    loading: false,
    placeholder: '',
    table: { rows: [] }
};

export default TypeaheadTable;
