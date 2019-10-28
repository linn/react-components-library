import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Table, TableHead, TableBody } from '@material-ui/core';
import { InputField, Dropdown } from '@linn-it/linn-form-components-library';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add'; //will be adding these two in soon
import DeleteIcon from '@material-ui/icons/Delete';

function TableWithInlineEditing({ content, columnsInfo, updateContent, allowedToEdit }) {
    const [editingCellId, setEditingCellId] = useState({});

    const handleRowChange = (propertyName, newValue, rowIndex) => {
        const updatedRow = { ...content[rowIndex], [propertyName]: newValue };

        updateContent(
            content
                .slice(0, rowIndex)
                .concat(updatedRow)
                .concat(content.slice(rowIndex + 1, content.length + 1))
        );
    };

    const switchToEditingDifferentCell = newCellId => {
        setEditingCellId(newCellId);
    };

    const clearEditingCell = () => {
        setEditingCellId('');
    };

    return (
        <Fragment>
            <Table>
                <TableHead key="headers" onClick={clearEditingCell}>
                    <TableRow>
                        {columnsInfo.map(el => (
                            <TableCell>{el.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((el, index) => (
                        <Row
                            rowContent={el}
                            key={index}
                            rowIndex={index}
                            updateField={handleRowChange}
                            columnsInfo={columnsInfo}
                            currentlyEditing={editingCellId}
                            changeCell={switchToEditingDifferentCell}
                            allowedToEdit={allowedToEdit}
                            clearEditingCell={clearEditingCell}
                        />
                    ))}
                    <Row
                        rowContent={[{}]}
                        key="newRow"
                        rowIndex={content.length}
                        updateField={handleRowChange}
                        columnsInfo={columnsInfo}
                        currentlyEditing={editingCellId}
                        changeCell={switchToEditingDifferentCell}
                        allowedToEdit={allowedToEdit}
                        clearEditingCell={clearEditingCell}
                        isNewRow
                    />
                </TableBody>
            </Table>
        </Fragment>
    );
}

TableWithInlineEditing.propTypes = {
    content: PropTypes.arrayOf(PropTypes.shape({})),
    updateContent: PropTypes.func.isRequired,
    columnsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            displayName: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired,
    allowedToEdit: PropTypes.bool.isRequired
};

TableWithInlineEditing.defaultProps = {
    content: [{}]
};

const Row = ({
    rowContent,
    rowIndex,
    updateField,
    columnsInfo,
    currentlyEditing,
    changeCell,
    allowedToEdit,
    clearEditingCell,
    isNewRow
}) => {
    const useStyles = makeStyles(theme => ({
        pointer: { cursor: 'pointer' },
        notClickable: { cursor: 'text' }
    }));

    const classes = useStyles();

    const handleCellChange = (propertyName, newValue) => {
        updateField(propertyName, newValue, rowIndex);
    };

    const handleKeyPress = (e, columnIndex) => {
        if (e.key === 'Enter') {
            clearEditingCell();
        } else if (e.key === 'Tab') {
            if (columnIndex < columnsInfo.length - 1) {
                changeCell(`${rowIndex}${columnsInfo[columnIndex + 1].key}`);
            } else {
                changeCell(`${rowIndex + 1}${columnsInfo[0].key}`);
            }
        }
    };

    return (
        <Fragment>
            <TableRow>
                {rowContent !== {} &&
                    columnsInfo &&
                    (allowedToEdit ? (
                        <Fragment>
                            {columnsInfo.map((column, index) => (
                                <Fragment>
                                    <TableCell
                                        key={columnsInfo[index].title}
                                        onClick={() => changeCell(`${rowIndex}${column.key}`)}
                                        onKeyDown={e => handleKeyPress(e, index)}
                                    >
                                        {currentlyEditing !== `${rowIndex}${column.key}` ? (
                                            <span
                                                id={`outer${rowIndex}-${index}`}
                                                name={column.key}
                                                className={classes.pointer}
                                            >
                                                {rowContent[column.key]}
                                            </span>
                                        ) : (
                                            <div id={`inner${rowIndex}-${index}`}>
                                                {column.type === 'dropdown' ? (
                                                    <Dropdown
                                                        onChange={handleCellChange}
                                                        items={column.options}
                                                        value={rowContent[column.key]}
                                                        propertyName={column.key}
                                                    />
                                                ) : (
                                                    <InputField
                                                        type={column.type}
                                                        value={rowContent[column.key]}
                                                        onChange={handleCellChange}
                                                        propertyName={column.key}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                </Fragment>
                            ))}
                        </Fragment>
                    ) : (
                        //readonly for users without edit permission
                        <Fragment>
                            {columnsInfo.map((column, index) => (
                                <Fragment>
                                    <TableCell key={columnsInfo[index].title}>
                                        <span name={column.key} className={classes.notClickable}>
                                            {rowContent[column.key]}
                                        </span>
                                    </TableCell>
                                </Fragment>
                            ))}
                        </Fragment>
                    ))}
            </TableRow>
        </Fragment>
    );
};

Row.propTypes = {
    rowContent: PropTypes.shape({}),
    rowIndex: PropTypes.number.isRequired,
    updateField: PropTypes.func.isRequired,
    currentlyEditing: PropTypes.string.isRequired,
    changeCell: PropTypes.func.isRequired,
    allowedToEdit: PropTypes.bool.isRequired,
    clearEditingCell: PropTypes.func.isRequired,
    columnsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            displayName: PropTypes.string,
            type: PropTypes.string
        })
    ).isRequired,
    isNewRow: PropTypes.bool
};

Row.defaultProps = {
    rowContent: {},
    isNewRow: false
};

export default TableWithInlineEditing;
