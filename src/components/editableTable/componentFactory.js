import React from 'react';
import moment from 'moment';
import DatePicker from '../DatePicker';
import InputField from '../InputField';
import LinnWeekPicker from '../LinnWeekPicker';
import Typeahead from '../Typeahead';
import Dropdown from '../Dropdown';

export function inputComponentFactory(row, column, onChange, rest) {
    switch (column.type) {
        case 'text':
            return (
                <InputField
                    value={row[column.id]}
                    disabled={!column.editable}
                    onChange={onChange}
                    propertyName={column.id}
                />
            );
        case 'number':
            return (
                <InputField
                    value={row[column.id]}
                    type="number"
                    disabled={!column.editable}
                    onChange={onChange}
                    propertyName={column.id}
                />
            );
        case 'date':
            return (
                <DatePicker
                    disabled={!column.editable}
                    value={row[column.id]}
                    onChange={value => onChange(column.id, value)}
                />
            );
        case 'linnWeek':
            return (
                <LinnWeekPicker
                    disabled={!column.editable}
                    selectedDate={row[column.id]}
                    setWeekStartDate={onChange}
                    propertyName={column.id}
                />
            );
        case 'search':
            return (
                <Typeahead
                    clearSearch={() => column.clearSearch}
                    disabled={!column.editable}
                    fetchItems={column.search}
                    items={column.searchResults}
                    links={false}
                    loading={column.searchLoading}
                    modal
                    onSelect={newValue => column.selectSearchResult(column.id, newValue, row)}
                    propertyName={column.id}
                    title={column.searchTitle}
                    value={row[column.id]}
                />
            );
        case 'dropdown':
            return (
                <Dropdown
                    fullWidth
                    value={row[column.id]}
                    onChange={onChange}
                    items={column.options}
                    propertyName={column.id}
                />
            );
        case 'component':
            return (
                <column.component
                    value={row[column.id]}
                    onChange={value => onChange(column.id, value)}
                    {...rest}
                />
            );
        default:
            return '';
    }
}

export function displayComponentFactory(row, column) {
    switch (column.type) {
        case 'date':
        case 'linnWeek':
            return moment(row[column.id]).format('DD MMM YYYY');
        default:
            return row[column.id];
    }
}
