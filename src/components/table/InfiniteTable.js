import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { getSelfHref } from '../../utilities/index';

function InfiniteTable({ table, columnNames }) {
    const [rowOpen, setRowOpen] = useState();

    const handleRowOnClick = salesPackageId =>
        rowOpen === salesPackageId ? setRowOpen(null) : setRowOpen(salesPackageId);

    const cursor = {
        cursor: 'pointer'
    };

    const identifySelfLink = row => getSelfHref(row);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columnNames.map(columnName => (
                        <TableCell>{columnName.label}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {table.rows &&
                    table.rows.map(row => (
                        <Fragment key={row.Id}>
                            <TableRow style={cursor} hover onClick={() => handleRowOnClick(row.Id)}>
                                {row.values.map(cell => (
                                    <TableCell component="th" scope="row">
                                        {cell}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Link key={row.Id} to={() => identifySelfLink(row.Id)}>
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
        </Table>
    );
}

InfiniteTable.propTypes = {
    table: PropTypes.shape({
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
    columnNames: PropTypes.arrayOf(
        PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
    ).isRequired
};

export default InfiniteTable;
