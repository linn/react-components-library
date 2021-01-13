/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import MomentUtils from '@date-io/moment';
import { withKnobs } from '@storybook/addon-knobs';
import {
    Title,
    Description,
    Primary,
    ArgsTable,
    Stories,
    PRIMARY_STORY
} from '@storybook/addon-docs/blocks';
import SingleEditTable from '../components/editableTable/SingleEditTable';
import { linnTheme } from '../themes/linnTheme';

export const component = () => (
    <div>
        <button type="button">Custom</button>
    </div>
);

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
        // eslint-disable-next-line react/prop-types
        component: ({ value }) => (
            <div>
                <button type="button">{value}</button>
            </div>
        )
    }
];

export default {
    title: 'Components/SingleEditTable',
    decorators: [
        withKnobs,
        story => (
            <ThemeProvider theme={linnTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <div>{story()}</div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        )
    ],
    excludeStories: ['component'],
    component: SingleEditTable,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description
                        markdown="Editable table to support updating and creating rows individually. Each row is treated as an individual entity so expects to call save/update/delete actions and refetch data in our usual flow.
                    <br/><br/>
                    Columns prop defines the shape of the table and passes in the appropriate functions for saving etc.
                    <br/><br/>
                    Story book doesn't currently support complex props in the arg table [but its currently being worked on](https://github.com/storybookjs/storybook/issues/12078)
                    <br/><br/>
                    column props:
                    <br/><br/>
                    `{`
                    <br/>
                    `id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,`
                    <br/>
                    `type: PropTypes.string.isRequired,`
                    <br/>
                    `component: PropTypes.func,`
                    <br/>
                    `editable: PropTypes.bool,`
                    <br/>
                    `options: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.shape({}), PropTypes.string])),`
                    <br/>
                    `required: PropTypes.bool,`
                    <br/>
                    `searchLoading: PropTypes.bool,`
                    <br/>
                    `searchResults: PropTypes.arrayOf(PropTypes.shape({})),`
                    <br/>
                    `searchTitle: PropTypes.string,`
                    <br/>
                    `tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),`
                    <br/>
                    `clearSearch: PropTypes.func,`
                    <br/>
                    `closeRowOnClickAway: PropTypes.func,`
                    <br/>
                    `search: PropTypes.func,`
                    <br/>
                    `selectSearchResult: PropTypes.func`
                    <br/>
                    `}`
                    <br/><br/>
                    Each row must have a unique id and have property names relating to column ids. Values are accessed using `row[column.id]`
                    <br/>
                    The first row of the below examples is:
                    <br/><br/>
                    `{`
                    <br/>
                    `id: 0,`
                    <br/>
                    `text: 'column 1',`
                    <br/>
                    `extraInfo: 'some extra information about column 1',`
                    <br/>
                    `number: 123,`
                    <br/>
                    `date: moment('2020-12-21'),`
                    <br/>
                    `linnWeek: moment(),`
                    <br/>
                    `search: 'search',`
                    <br/>
                    `dropdown: 'one',`
                    <br/>
                    `component: 'custom 1'`
                    <br/>
                    `}`
                    <br/><br/>
                    "
                    />
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            )
        }
    }
};

export const Default = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        {...args}
    />
);

Default.story = {
    name: 'Default'
};

export const ClickAway = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        {...args}
    />
);

ClickAway.story = {
    name: 'Close Row on Click Away'
};

export const DisplayOnly = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        editable={false}
        {...args}
    />
);

DisplayOnly.story = {
    name: 'Display Only'
};

export const StaticRows = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        allowNewRowCreation={false}
        {...args}
    />
);

StaticRows.story = {
    name: 'New Row Disabled'
};

export const ShowDelete = args => (
    <SingleEditTable
        columns={columns}
        rows={rows}
        tableValid={() => true}
        deleteRow={() => true}
        deleteRowPreEdit
        {...args}
    />
);

ShowDelete.story = {
    name: 'Show Delete Prior to Edit'
};

ShowDelete.parameters = {
    docs: {
        description: {
            story:
                'The deleteRowPreEdit prop shows the delete button prior to pressing the edit button'
        }
    }
};
