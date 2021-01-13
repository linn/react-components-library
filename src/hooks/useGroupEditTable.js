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
        setData(data.map(row => (row.id === id ? { ...row, editing } : row)));
    };

    const setTableValid = isValid => setValid(isValid);

    return {
        data,
        setData,
        addRow,
        updateRow,
        removeRow,
        resetRow,
        setEditing,
        setTableValid,
        valid
    };
};

export default useGroupEditTable;
