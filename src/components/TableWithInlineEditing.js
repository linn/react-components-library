import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InputField from './InputField';
import Dropdown from './Dropdown';

function TableWithInlineEditing({
    content,
    columnsInfo,
    updateContent,
    allowedToEdit,
    allowedToCreate,
    allowedToDelete
}) {
    const [editingCellId, setEditingCellId] = useState('');

    const handleRowChange = (propertyName, newValue, rowIndex) => {
        const updatedRow = { ...content[rowIndex], [propertyName]: newValue };

        updateContent(
            content
                .slice(0, rowIndex)
                .concat(updatedRow)
                .concat(content.slice(rowIndex + 1, content.length + 1))
        );
    };

    const handleRemoveRow = rowIndex => {
        updateContent(
            content.slice(0, rowIndex).concat(content.slice(rowIndex + 1, content.length + 1))
        );
    };

    const addNewRow = () => {
        let newRow = { id: new Date().getTime() };

        columnsInfo.forEach(column => {
            newRow = { ...newRow, [column.key]: null };
        });

        updateContent(content.concat(newRow));
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
                        {columnsInfo.map(column => (
                            <TableCell key={column.key}>{column.title}</TableCell>
                        ))}
                        {allowedToDelete && <TableCell key="Deleteplaceholdercell" />}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {content.map((el, index) => (
                        <Row
                            rowContent={el}
                            key={el.id}
                            rowIndex={index}
                            updateField={handleRowChange}
                            columnsInfo={columnsInfo}
                            currentlyEditing={editingCellId}
                            changeCell={switchToEditingDifferentCell}
                            allowedToEdit={allowedToEdit}
                            clearEditingCell={clearEditingCell}
                            removeRow={handleRemoveRow}
                            allowedToDelete={allowedToDelete}
                        />
                    ))}
                    {allowedToCreate && (
                        <TableRow>
                            <TableCell>
                                <Tooltip title="Add new row" aria-label="add">
                                    <Button onClick={addNewRow}>
                                        <AddIcon data-testid="addIcon" />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Fragment>
    );
}

TableWithInlineEditing.propTypes = {
    content: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ),
    updateContent: PropTypes.func.isRequired,
    columnsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ).isRequired,
    allowedToEdit: PropTypes.bool.isRequired,
    allowedToCreate: PropTypes.bool,
    allowedToDelete: PropTypes.bool
};

TableWithInlineEditing.defaultProps = {
    content: [{}],
    allowedToCreate: false,
    allowedToDelete: false
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
    removeRow,
    allowedToDelete
}) => {
    const useStyles = makeStyles(() => ({
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
        } else if (e.shiftKey && e.key === 'Tab') {
            if (columnIndex > 0) {
                changeCell(`${rowIndex}${columnsInfo[columnIndex - 1].key}`);
            } else {
                changeCell(`${rowIndex - 1}${columnsInfo[columnsInfo.length - 1].key}`);
            }
        } else if (e.key === 'Tab') {
            if (columnIndex < columnsInfo.length - 1) {
                changeCell(`${rowIndex}${columnsInfo[columnIndex + 1].key}`);
            } else {
                changeCell(`${rowIndex + 1}${columnsInfo[0].key}`);
            }
        }
    };

    const handleRemoveRow = () => {
        removeRow(rowIndex);
    };

    return (
        <TableRow key={rowContent.id}>
            {rowContent !== {} &&
                columnsInfo &&
                (allowedToEdit ? (
                    <Fragment>
                        {columnsInfo.map((column, index) => (
                            <Fragment key={column.title}>
                                <TableCell
                                    onClick={() => changeCell(`${rowIndex}${column.key}`)}
                                    onKeyDown={e => handleKeyPress(e, index)}
                                    className={classes.pointer}
                                >
                                    {currentlyEditing !== `${rowIndex}${column.key}` ? (
                                        <span id={`outer${rowIndex}-${index}`} name={column.key}>
                                            {rowContent[column.key]}
                                        </span>
                                    ) : (
                                        <div id={`inner${rowIndex}-${index}`}>
                                            {column.type === 'dropdown' ? (
                                                <Dropdown
                                                    onChange={handleCellChange}
                                                    items={column.options}
                                                    value={rowContent[column.key]}
                                                    disabled={column.notEditable}
                                                    propertyName={column.key}
                                                    label=""
                                                    allowNoValue={false}
                                                />
                                            ) : (
                                                <InputField
                                                    type={column.type}
                                                    value={rowContent[column.key]}
                                                    disabled={column.notEditable}
                                                    onChange={handleCellChange}
                                                    propertyName={column.key}
                                                />
                                            )}
                                        </div>
                                    )}
                                </TableCell>
                            </Fragment>
                        ))}
                        {allowedToDelete && (
                            <TableCell key="DeleteIcon">
                                <Tooltip title="Delete row" aria-label="add">
                                    <Button onClick={handleRemoveRow}>
                                        <DeleteIcon data-testid="deleteIcon" />
                                    </Button>
                                </Tooltip>
                            </TableCell>
                        )}
                    </Fragment>
                ) : (
                    //readonly for users without edit permission
                    <Fragment>
                        {columnsInfo.map(column => (
                            <Fragment key={column.title}>
                                <TableCell>
                                    <span name={column.key} className={classes.notClickable}>
                                        {rowContent[column.key]}
                                    </span>
                                </TableCell>
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
        </TableRow>
    );
};

Row.propTypes = {
    rowContent: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    rowIndex: PropTypes.number.isRequired,
    updateField: PropTypes.func.isRequired,
    currentlyEditing: PropTypes.string.isRequired,
    changeCell: PropTypes.func.isRequired,
    allowedToEdit: PropTypes.bool.isRequired,
    clearEditingCell: PropTypes.func.isRequired,
    columnsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            notEditable: PropTypes.bool
        })
    ).isRequired,
    removeRow: PropTypes.func.isRequired,
    allowedToDelete: PropTypes.bool.isRequired
};

Row.defaultProps = {
    rowContent: {}
};

export default TableWithInlineEditing;
