# Changelog
## [11.5.1] - 2021-04-26
### Added
- Added clearItem to update actions

## [11.5.0] - 2021-04-19
### Added
- Option to add custom style to editable table columns

## [11.4.1] - 2021-03-24
### Added
- Added fetchById to FetchApiActions

## [11.4.0] - 2021-03-24
### Added
- Added optional accept parameter to FetchApiActions and UpdateApiActions to allow request of different media types

## [11.3.6] - 2021-03-23
### Changed
- Fixed mixed up Breadcrumbs defaultProps/PropTypes

## [11.3.5] - 2021-03-23
### Changed
- Change breadcrumbs 'HOME' crumb to redirect to a specified home url. Defaults to app.linn.co.uk
- Page component can optionally not render Breadcrumbs with a showBreadcrumbs bool prop. Defaults to true.

## [11.3.4] - 2021-03-19
### Changed
- Added searchButtonOnly to TypeAhead to show search icon button only in modal mode

## [11.3.3] - 2021-03-11
### Changed
- Added clear data action

## [11.3.2] - 2021-03-11
### Changed
- Added clear data option to processes

## [11.3.1] - 2021-03-02
### Changed
- Removed !important from display none on display only when printing

## [11.3.0] - 2021-02-24
### Added
- Added getData option to process selectors

## [11.2.1] - 2021-02-16
### Added
- Added wee style to hide something then show only when printing

## [11.2.0] - 2021-02-03
### Changed
- Allow SingleEditTable to have multiline textfields. Allow newRow to be specified to render at top or bottom via new 'newRowPosition' prop. Deafults to "bottom" so no breaking/altering exsiting usages.
- Allow modal version of the TypeaheadTable. Allow custon onSelect behaviour alongside default links behaviour. 

## [11.1.8] - 2021-02-03
### Changed
- Just needed to redeploy after trying to without logging into npm

## [11.1.7] - 2021-02-03
### Changed
-  Added optional "print-landscape" class to set page to print landscape

## [11.1.5] - 2021-01-29
### Changed
-  Allow custom debounce timer to be passed into Typeaheads. Higher debounce times mitigate against cases where searches take longer than the current debounce timer (500ms), which in turn can allow those searches late set of searchResults to arrive later than more recent searches results, and as such override the more recent and correct searchResults in redux state. This is really just a workaround but used in conjucntion with speeding up slow searches, e.g. by limiting their results sizes in the backend, it seems to solve issues in many cases.

## [11.1.4] - 2021-01-28
### Changed
-  Optionally limit searchItems returned from the collectionSelectors getSearchItems() function. This is to avoid huge searchResults lists freezing up UI components like Typeaheads

## [11.1.3] - 2021-01-28
### Fixed
- TypeAheadDialog now auto focuses on search input field
- Updated column and row documentation in single and group edit table stories

## [11.1.2] - 2021-01-27
### Changed
- Pass in optional setEditStatus function to useGroupEditTable hook. This allows the table to set editStatus state in a parent component or redux state store.

## [11.1.1] - 2021-01-26
### Changed
- Export useGroupEditTable hook

## [11.1.0] - 2021-01-26
### Changed
- Support for limiting Typeahead to only fire off search after a set number of searchTerm characters. Also added support for the above in the table component.

## [11.0.0] - 2020-12-22
### Changed
- Updated to Storybook 6 and updated story files

### Added
- Components
    - SingleEditTable
    - GroupEditTable
- Hooks
    - useGroupEditTable

### Removed
- EditableTable

## [10.13.4] - 2020-01-07
### Fixed
- `EditableTable` delete button logic and remove click listener which was always setting edit state to true after clicking cancel button

## [10.13.3] - 2020-01-07
### Fixed
- Issue where not passing optional `isTableValid` to `EditableTable` would crash

## [10.13.2] - 2020-12-21
### Changed
## EditableTable
- Fixed a weird bug where inputs were losing focus for no apparent reason
- Added a groupEdit storybook example.

## [10.13.1] - 2020-12-17
### Changed
## EditableTable
- Minor ui improvements for the Editable table. Rows open and optionally close on click and clickaway. Tooltips for buttons.
- Delete button stays shown when row is closed if a deleteRow function is supplied.
- Added optional tooltips for table cells. You pass this in as part of the columns array, in the form of a function that takes a row and derives a tooltip string from data in the row. You could return false from this function for some rows if they don't have any tooltips for that column. Storybook example updated to show how this works.

## [10.13.0] - 2020-12-16
### Added
- groupEdit mode for EditableTable. This allows for editing, adding and saving of multiple rows at once in the component
- added validator function to validate the complete table (e.g. for external save buttons)

## [10.12.5] - 2020-12-09
### Added
- Added allowNewRowCreation option to EditableTable to stop user seeing the new row button
### Changed
- Changed EditableTableRow to not show edit button when table is not editable

## [10.12.4] - 2020-12-09
### Added
- Added closeEditingOnSave option to editableTable to allow editor to remain open if validation is failed
- Added process data to process reducer

## [10.12.3] - 2020-12-07
### Fixed
- Pass itemName into process action  payload
## [10.12.2] - 2020-12-07
### Changed
- Allow process action to have a payload

## [10.12.1] - 2020-11-20
### Fixed

- Editable Table hides new row when it is saved and is no longer a 'new' row.

## [10.12.0] - 2020-11-20
### Fixed

- Editable Table closes row on save click

## [10.11.0] - 2020-11-05

### Added
- SelectedItemList optional maxHeight parameter to allow scrolling on long lists

## [10.10.3] - 2020-10-09
- Updated material-ui packages

## [10.10.2] - 2020-09-16

### Fixed

- Correctly set content type of delete body

## [10.10.1] - 2020-09-09

### Fixed

- Can set body of delete action

## [10.10.0] - 2020-09-09

### Added
- EditableTable
    - Delete row functionality
    - Optional custom update row function
    - Optional validate row function
    - Fields that are required but not editable can now be changed when creating a new row and will be read only when editing
    - Update styling of Save, Cancel and Delete buttons on table rows
- UpdateApiActions.delete - id can be null

## [10.9.0] - 2020-09-02
- Added: LinkButton component that can link to components inside the current (React Router) app via a Link component, or hrefs outside the current app with an html anchor. Optionally takes tooltip text as a prop if you want to display a tooltip, e.g. to inform the user why the button might be disabled.

## [10.8.0] - 2020-03-11
- Added: smartGoBack function that can hop over the annoying oidc page to take a user to wherever they came from, whether that's inside the current app or not
- Added: previousPathsSelector - selects a list of paths the user has been to inside this app from the store.

## [10.7.2] - 2020-02-25
- Autofocus inputs on TableWithInlineEditing
- Can now search the menu by href, e.g. you could type 'pcbwo' to find pcb works orders

## [10.7.1] - 2020-02-25
- Added date utilities to index

## [10.7.0] - 2020-02-24
- Added a search to the Navigation component

## [10.6.12] - 2020-02-21
- Added: Updating a cell in a row in the TableWithInlineEditing can now optionally trigger updates for other cells in that row. This is useful if the result of input to one cell should auto update the other cells, e.g. if you enter a partNumber you could make the description autofill.

## [10.6.11] - 2020-02-19
- Add printStyles to the build. Importing any component from this library now gives you the print styles (which will now be centrally maintained here) for free.

## [10.6.7] - 2020-02-17
- Updated redux-api-middleware to v3.2.0

## [10.6.5] - 2020-02-12
- Made report table 'avoid page break' style the default, but is now optional in report table and multi report table

## [10.6.4] - 2020-02-12
- Added CI. All commits now run the tests and build scripts. All commits (which should only be merge commits!) to master run build -> test -> publish -> deploy. Updated the readme, replacing the old manual change integraton manual with this new process.

## [10.6.3] - 2020-02-05
- pass column widths to ReportData in three sizes small/medium/large

## [10.6.1] - 2020-02-06

## Changed
- Remove new row from EditableTable on clicking cancel button

## [10.6.0] - 2020-02-04

## Changed
- Allow alternative text than 'Back' on the BackButton. This is really so that you can be more specified, e.g. 'Back to Menu'.
- Allow a custom debounce (time in ms) to be passed into useSearch. Example of usage in TypeaheadTable.
- Allow a minimum search term length before the search gets fired off. This is useful in cases like board parts lookups, where the first 4 characters are pretty meaningless (i.e. PCAS or PCSM). Defaults to one to avoid any breakage.

## [10.5.0] - 2020-01-30

## Added
- UpdateApiActions: add id parameter can take null value

## [10.4.1] - 2020-01-15

## Added
- TableWithInlineEditing: allow disabled and required columns

## [10.4.0] - 2020-01-14

## Added
- added delete into item factory and updateApiActions & makeactions

## [10.3.8] - 2020-01-14

## Fixed
- EditableTable component factory will show null dates
- Added missing newRow prop to EditableTable

## [10.3.7] - 2020-01-14

## Added
- Disabled option for Typeahead, defaults to false. 

## [10.3.6] - 2020-01-10

## Fixed
- EditableTable now correctly renders null dates in display mode

## [10.3.5] - 2020-01-10

## Changed
- Default rowTitle to noWrap class in ReportTable.

## [10.3.4] - 2020-01-10

## Added
- Unbreak navigation styles already applied

## [10.3.3] - 2020-01-09

## Added
- Classes to be used to hide Navigation and Breadcrumbs when printing

## [10.3.2] - 2020-01-09

## Added
- Editable Table stories

## Changed
- Export Editable Table component

## [10.3.1] - 2020-01-09

## Changed
- Highlight total columns in ReportTable

## [10.3.0] - 2020-01-07

## Added
- Editable Table component
- Keyboard input to Linn Week Picker

## Changed
- Linn Week Picker component label prop is no longer required
- Dropdown label prop is no longer required

## [10.2.5] - 2020-01-06

## Changed
- Reverted theme provider back to old import using MuiThemeProvider

## [10.2.4] - 2020-01-06

## Changed
- Fixed forgotten tests for loading inside application state + updated how we used MuiThemeProvider to most current way to get rid of warnings

## [10.2.3] - 2019-12-0

## Changed
- Add loading inside application state in item & collection factory reducers and selectors

## [10.2.1] - 2019-12-0

## Changed
- Pass placeholder text prop to the InputField in the modal as well as the main one.

## [10.2.0] - 2019-12-06

## Changed

- Extended the Typeahead to be more flexible than a search that just links you to other pages. It now takes an onSelect action as an optional prop such that you can define custom behaviour, and a links boolean which you can set to false to override the default behaviour of navigating to a new page onSelect. You should provide an onSelect function and a links={false} configuration if custom behaviour is required ( and conversely should not provide an onSelect and a links={true} config, since any onSelect() bheaviour is ignored if links is true anyway). 

Now also takes an optional modal boolean prop which lets you display search results in a modal as opposed to below the search which is useful for using this in a form where there isn't space to displau search results in the same plane as the field.

The two new props have default values such that original use cases are respected - i.e. links={true} and modal={false} - hence no breaking changes in this version.

## [10.1.0] - 2019-12-04
### Added
- StateApiActions
### Changed
- added application state to actions, reducers and selectors

## [10.0.4] - 2019-11-21

### Changed

- added css for printing tables and used within page

## [10.0.3] - 2019-11-20

### Changed

- added fix for side scrolling issue

## [10.0.1] - 2019-11-18

### Changed

- Reverted formatTitle to previous version with drilldown and formatting.

## [10.0.0] - 2019-11-18

### Changed

- Declared notistack and react router as peer and dev dependencies as opposed to production dependencies. This means this package will expect to find them in your consuming project at the same version as declared here. 

## [9.0.3] - 2019-11-15

### Changed

- Update table with inline editing to include add and delete icons, extra props for these permissions + tests

## [9.0.2] - 2019-11-13

### Fixed

- ```LinnWeekPicker``` now takes strings or date objects

### Added

- ```dateUtilities``` for Linn Weeks
- Tests for ```LinnWeekPicker```

## [9.0.2] - 2019-11-12

### Changed

- Declare @material-ui/pickers as a peer dependency and a dev dependency. This is so that the tests pass in Production without there being two instances of the package AND so that the @material-ui/pickers package is available to the storybook too. I can't think of any other way to solve this problem...

## [9.0.1] - 2019-11-12

### Changed

- Use same version of react-redux as consuming projects.

## [9.0.0] - 2019-11-12

### Removed

- clearSearch() and clearErrors() actionCreators from UpdateApiActions.js. We don't use these.

### Fixed

-   Various errors that resulted in unwanted debug warnings across numerous components.

-  Dropdown - Now handles an allowNoValue as well as an optionsLoading state, both passed in as props (bool).

## [8.1.0] - 2019-11-06

### Added

-   New Component - LinnWeekPicker

## [8.0.1] - 2019-10-31

### Fixed

-   Added TableWithInlineEditing to the index. I had accidentally removed it.

## [8.0.0] - 2019-10-29

### Added

-   TypeheadTable - a typeahead with tabulated results

### Removed

-   InfiniteTable

## [7.5.0] - 2019-10-29

### Added

-   Table with inline editing

## [7.4.2] - 2019-10-28

### Changed

-   Support nowrap option on report cells

## [7.4.1]

### Changed

-   Added missing process action type

## [7.4.0] - 2019-10-10

### Added

-   Added clear error method to process actions.

## [7.3.0] - 2019-10-10

### Changed

-   Changed initialiseOnMount to pass props into initialise when itemId not provided.
    Fixed broken reportOptionsFactory.

## [7.2.1] - 2019-10-10

### Added

-   Added makeProcessActionTypes and new rsaaType for process

## [7.2.0] - 2019-10-08

### Added

-   New Component - ValidatedInputDialog

### Changed

-   Fixed broken stories.

## [7.1.1] - 2019-10-07

### Added

-   ProcessActions, ProcessSelectors and processStoreFactory

## [7.1.0] - 2019-10-04

### Added

-   CHANGELOG.md

## [7.0.2] - 2019-10-03

### Added

-   Export error details message selector

## [7.0.1] - 2019-10-02

### Added

-   Fetch error details message selector

## [7.0.0] - 2019-09-26

### Added

-   Report errors
    -   Report actions must add their item type as the first prop
    ```
    export default new ReportActions(
        reportTypes.whoBuiltWhat.item,
        reportTypes.whoBuiltWhatDetails.actionType,
        reportTypes.whoBuiltWhatDetails.uri,
        actionTypes,
        config.appRoot
    );
    ```

## [6.0.0] - 2019-09-23

### Added

-   New error style
    -   Actions must add their item type as the first prop
    ```
    export default new FetchApiActions(
        itemTypes.cits.item,
        itemTypes.cits.actionType,
        itemTypes.cits.uri,
        actionTypes,
        config.appRoot
    );
    ```

### Changed

-   action types to shared rsaa types

## [5.0.0] - 2019-16-08

### Added

-   Date time picker

### Changed

-   Utilites functions exported from utilites file
    -   All imports must be updated
        `import { getHref } from '@linn/react-components-library'`
        should now be
        `import { utilites } from '@linn/react-components-library'`
        and used as
        `utilities.getHref(item)`
-   Rollup config
-   Bundle splitting
