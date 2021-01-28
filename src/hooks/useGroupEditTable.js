import { useState, useEffect } from 'react';

const useGroupEditTable = ({ rows, defaultRow, setEditStatus }) => {
    const [data, setData] = useState([]);
    const [valid, setValid] = useState();
    useEffect(() => {
        setData(rows);
    }, [rows]);

    const addRow = () => {
        if (setEditStatus) {
            setEditStatus('edit');
        }
        if (defaultRow) {
            setData([...data, { ...defaultRow, editing: true, isNewRow: true }]);
        } else {
            setData([...data, { id: new Date().getTime(), editing: true, isNewRow: true }]);
        }
    };

    const updateRow = (item, setItem, propertyName, newValue) => {
        if (setEditStatus) {
            setEditStatus('edit');
        }
        setData(() =>
            data.map(row =>
                row.id === item.id ? { ...row, [propertyName]: newValue, editing: true } : row
            )
        );
    };

    const removeRow = id => {
        if (setEditStatus) {
            setEditStatus('edit');
        }
        setData(data.filter(row => row.id !== id));
    };

    const resetRow = item => {
        const updatedRow = rows.find(r => r.id === item.id);
        setData(() =>
            data.map(row => (row.id === item.id ? { ...updatedRow, editing: false } : row))
        );
    };

    const setEditing = (id, editing) => {
        setData(d =>
            d.map(row =>
                row.id === id ? { ...row, editing, toBeSaved: false, toBeDeleted: false } : row
            )
        );
    };

    const setTableValid = isValid => setValid(isValid);

    const setRowToBeSaved = (id, toBeSaved) => {
        setData(
            data.map(row => (row.id === id ? { ...row, toBeSaved, editing: !toBeSaved } : row))
        );
    };

    const setRowToBeDeleted = (id, toBeDeleted) => {
        if (setEditStatus) {
            setEditStatus('edit');
        }
        setData(
            data.map(row => (row.id === id ? { ...row, toBeDeleted, editing: !toBeDeleted } : row))
        );
    };

    const removeRowsToBeDeleted = () => {
        setData(data.filter(row => row.toBeDeleted !== true));
    };

    const resetUnsavedRows = () => {
        setData(
            data.map(row =>
                row.editing === true ? { ...rows.find(r => r.id === row.id), editing: false } : row
            )
        );
    };

    return {
        data,
        setData,
        addRow,
        updateRow,
        removeRow,
        resetRow,
        setRowToBeDeleted,
        setRowToBeSaved,
        setEditing,
        setTableValid,
        removeRowsToBeDeleted,
        resetUnsavedRows,
        valid
    };
};

export default useGroupEditTable;
