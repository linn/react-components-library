import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import { inputComponentFactory, displayComponentFactory } from './componentFactory';

const defaultStyle = {
    minWidth: '120px'
};

export default function EditableTableCell({
    column,
    item,
    editable,
    editing,
    isNewRow,
    handleValueChange,
    ...rest
}) {
    const Content = () =>
        (editing && column.editable && editable) || (isNewRow && editing && column.required)
            ? inputComponentFactory(item, column, handleValueChange, column.textFieldRows, rest)
            : displayComponentFactory(item, column);

    const style = column.style?.body ? { ...defaultStyle, ...column.style.body } : defaultStyle;

    if (!column.tooltip) {
        return (
            <Fragment key={`${column?.id}${item.id}`}>
                <TableCell id={column.type} style={style}>
                    {Content()}
                </TableCell>
            </Fragment>
        );
    }
    return (
        <Fragment key={`${column?.id}${item.id}`}>
            <Tooltip title={column.tooltip(item) || ''}>
                <TableCell id={column.type} key={`${column?.id}${item.id}`} style={style}>
                    {Content()}
                </TableCell>
            </Tooltip>
        </Fragment>
    );
}

EditableTableCell.propTypes = {
    column: PropTypes.shape({
        tooltip: PropTypes.func,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        editable: PropTypes.bool,
        type: PropTypes.string,
        required: PropTypes.bool,
        textFieldRows: PropTypes.number,
        style: PropTypes.shape({
            body: PropTypes.shape({})
        })
    }).isRequired,
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    editable: PropTypes.bool,
    editing: PropTypes.bool,
    isNewRow: PropTypes.bool,
    handleValueChange: PropTypes.func.isRequired
};

EditableTableCell.defaultProps = {
    editable: false,
    editing: false,
    isNewRow: false
};
