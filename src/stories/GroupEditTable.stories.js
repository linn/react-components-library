/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import GroupEditTable from '../components/editableTable/GroupEditTable';
import { linnTheme } from '../themes/linnTheme';
import useGroupEditTable from '../hooks/useGroupEditTable';
import mdx from './GroupEditTable.mdx';

const rows = [
    {
        id: 0,
        text: 'column 1',
        extraInfo: 'some extra information about column 1',
        number: 1,
        date: moment('2020-12-21'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'one',
        component: 'custom 1'
    },
    {
        id: 1,
        text: 'column 2',
        extraInfo: 'some extra information about column 2',
        number: 2,
        date: moment('2020-12-25'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'two',
        component: 'custom 2'
    },
    {
        id: 2,
        text: 'column with no extra info',
        extraInfo: false,
        number: 3,
        date: moment('2020-12-20'),
        linnWeek: moment(),
        search: 'search',
        dropdown: 'three',
        component: 'custom 3'
    }
];

const columns = [
    {
        title: 'id',
        id: 'id',
        type: 'number',
        editable: false
    },
    {
        title: 'Text',
        id: 'text',
        type: 'text',
        editable: true,
        tooltip: row => row.extraInfo || false
    },
    {
        title: 'Number',
        id: 'number',
        type: 'number',
        editable: true
    },
    {
        title: 'Date',
        id: 'date',
        type: 'date',
        tooltip: () => 'From a function',
        editable: true
    },
    {
        title: 'Linn Week',
        id: 'linnWeek',
        type: 'linnWeek',
        editable: true
    },
    {
        title: 'Search',
        id: 'search',
        type: 'search',
        editable: true,
        searchResults: [
            { id: 'one', name: 'one' },
            { id: 'two', name: 'two' },
            { id: 'three', name: 'three' }
        ],
        search: () => {},
        selectSearchResult: () => {}
    },
    {
        title: 'Dropdown',
        id: 'dropdown',
        type: 'dropdown',
        editable: true,
        options: ['one', 'two', 'three']
    },
    {
        title: 'Component',
        id: 'component',
        type: 'component',
        editable: true,
        component: ({ value }) => (
            <div>
                <button type="button">{value}</button>
            </div>
        )
    }
];

const GroupEditTableWrapper = ({
    closeRowOnClickAway,
    editable,
    allowNewRowCreation,
    deleteRowPreEdit,
    removeRowOnDelete,
    applyCustomStyle
}) => {
    const {
        data,
        addRow,
        updateRow,
        removeRow,
        resetRow,
        setEditing,
        setTableValid,
        setRowToBeDeleted,
        setRowToBeSaved
    } = useGroupEditTable({ rows });

    return (
        <GroupEditTable
            columns={
                applyCustomStyle
                    ? columns.map(col =>
                          col.id === 'text'
                              ? {
                                    ...col,
                                    style: {
                                        body: { minWidth: '600px', backgroundColor: 'lightPink' },
                                        head: {
                                            fontSize: '20px',
                                            color: 'red',
                                            border: 'solid black',
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                              : col
                      )
                    : columns
            }
            rows={data}
            updateRow={updateRow}
            addRow={addRow}
            removeRow={removeRow}
            resetRow={resetRow}
            handleEditClick={setEditing}
            closeRowOnClickAway={closeRowOnClickAway}
            tableValid={setTableValid}
            editable={editable}
            allowNewRowCreation={allowNewRowCreation}
            deleteRowPreEdit={deleteRowPreEdit}
            setRowToBeDeleted={setRowToBeDeleted}
            setRowToBeSaved={setRowToBeSaved}
            removeRowOnDelete={removeRowOnDelete}
        />
    );
};

export default {
    title: 'Components/EditableTable/GroupEditTable',
    decorators: [
        story => (
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    ],
    component: GroupEditTable,
    parameters: {
        docs: {
            page: mdx
        }
    }
};

export const Default = args => <GroupEditTableWrapper {...args} />;

Default.story = {
    name: 'Default'
};

export const DisplayOnly = args => <GroupEditTableWrapper {...args} />;

DisplayOnly.story = {
    name: 'Display Only'
};

DisplayOnly.args = {
    editable: false
};

export const StaticRows = args => <GroupEditTableWrapper {...args} />;

StaticRows.story = {
    name: 'New Row Disabled'
};

StaticRows.args = {
    allowNewRowCreation: false
};

export const ShowDelete = args => <GroupEditTableWrapper {...args} />;

ShowDelete.story = {
    name: 'Show Delete Prior to Edit'
};

ShowDelete.args = {
    deleteRowPreEdit: true
};

export const RemoveRowOnDelete = args => <GroupEditTableWrapper {...args} />;

RemoveRowOnDelete.story = {
    name: 'Remove Rows when Deleting'
};

RemoveRowOnDelete.args = {
    removeRowOnDelete: true
};

export const CustomStyleCol = args => <GroupEditTableWrapper {...args} />;

CustomStyleCol.story = {
    name: 'Column With Custom Style'
};

CustomStyleCol.args = {
    applyCustomStyle: true
};
