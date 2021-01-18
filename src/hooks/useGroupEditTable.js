import { useState, useEffect } from 'react';

const useGroupEditTable = ({ rows, defaultRow }) => {
    const [data, setData] = useState([]);
    const [valid, setValid] = useState();

    useEffect(() => {
        setData(rows);
    }, [rows]);

    const addRow = () => {
        if (defaultRow) {
            setData([...data, { ...defaultRow, editing: true }]);
        } else {
            setData([...data, { id: new Date().getTime(), editing: true }]);
        }
    };

    const updateRow = (item, setItem, propertyName, newValue) => {
        setData(() =>
            data.map(row =>
                row.id === item.id ? { ...row, [propertyName]: newValue, editing: true } : row
            )
        );
    };

    const removeRow = id => {
        setData(data.filter(row => row.id !== id));
    };

    const resetRow = item => {
        const updatedRow = rows.find(r => r.id === item.id);
        setData(() =>
            data.map(row => (row.id === item.id ? { ...updatedRow, editing: false } : row))
        );
    };

    const setEditing = (id, editing) => {
        setData(
            data.map(row =>
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
        setData(
            data.map(row => (row.id === id ? { ...row, toBeDeleted, editing: !toBeDeleted } : row))
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
        valid
    };
};

export default useGroupEditTable;
