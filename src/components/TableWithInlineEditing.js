import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
        const updateValues = columnsInfo.find(c => c.key === propertyName).updateValues?.(newValue);

        if (updateValues) {
            for (let i = 0; i < updateValues.length; i += 1) {
                updatedRow[updateValues[i].propertyName] = updateValues[i].value;
            }
        }

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
                    <>
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
                                                    required={column.required}
                                                    propertyName={column.key}
                                                    label=""
                                                    allowNoValue={false}
                                                    textFieldProps={{ autoFocus: true }}
                                                    autoFocus
                                                />
                                            ) : (
                                                <InputField
                                                    type={column.type}
                                                    value={rowContent[column.key]}
                                                    disabled={column.notEditable}
                                                    required={column.required}
                                                    textFieldProps={{ autoFocus: true }}
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
                    </>
                ) : (
                    //readonly for users without edit permission
                    <>
                        {columnsInfo.map(column => (
                            <Fragment key={column.title}>
                                <TableCell>
                                    <span name={column.key} className={classes.notClickable}>
                                        {rowContent[column.key]}
                                    </span>
                                </TableCell>
                            </Fragment>
                        ))}
                    </>
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
            notEditable: PropTypes.bool,
            updateValues: PropTypes.func
        })
    ).isRequired,
    removeRow: PropTypes.func.isRequired,
    allowedToDelete: PropTypes.bool.isRequired
};

Row.defaultProps = {
    rowContent: {}
};

export default TableWithInlineEditing;
