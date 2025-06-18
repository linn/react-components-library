# Changelog
## [29.0.1] - 2025-06-13
- Fix Warning resulting from passing style to a Fragment
- Change mui Grid 'item xs' props to 'size'
## [29.0.0] - 2025-06-13
-  Pass handleSignOut from Navigation HOC to its child
- Rejig package.json - remove unused packages, move more stuff from dependencies into peerDependencies (technically breaking since consuming code will need to provide them now.)
## [28.1.0] - 2025-06-09
-  Properly respect LinkField disabled prop and add shouldRender
## [28.0.0] - 2025-06-09
-  Instead of always just rendering a secondary non-working sign out link, the Navigation UI component now conditionally renders a button to invoke an optional handleSignOut function, if it is passed by the consuming code. The expectation is that in this scenario the consuming code will not also pass a 'sign out' menu item as part of the myStuff section of the menu.json (i.e. it will specify its own custom sign out behaviour instead via the handleSignOut prop) 
## [27.0.0-27.0.2] - 2025-05-08
- Just some npm package updates. Breaking since major version increases of mui libraries - consuming code will need to match.
## [26.1.0] - 2025-04-24
### Changes
- added LinkField - simple link to match InputField display style with options for external/internal and open in new tab.
## [26.0.0-alpha] - 2025-04-08
-  Upgrade MUI to V7 (tentatively, hence the alpha version - will publish 26 proper once tested) 
## [25.1.0] - 2025-03-28
### Changes
- ReportDataGrid - pass rowType into DataGrid rows and make Total and Subtotal bold
## [25.0.0] - 2025-02-17
### Changes
- React 19 and various other updates
- Remove Storybook for now - needs updating
- Redux also updated a major version but is curently untested and so not guaranteed to work.
- All redux code will be stripped from this package soon, so using redux code from this version is not recommended

## [23.0.0-alpha.01] - 2024-12-05
### Changes
- React Router upgrade to v7
- Navigation component styling fixes + Esc key to close
## [23.0.0-alpha] - 2024-12-04
### Changes
- MUI V6 upgrade attempt - not tested, possibly very breaking hence the alpha version number
- Removed: ReportTable and all related code, Title component (since it was basically just an MUI Typography)
## [22.2.0] - 2024-11-07
### Changes
- ReportDataGrid - update number display to allow sorting
## [22.1.0] - 2024-11-05 :fireworks: :sparkler: :fireworks:
### Changes
- InputField: Revert back to passing type="number" to the internal input component

## [22.0.0] - 2024-11-05 :fireworks: :sparkler: :fireworks:
### Changes
- InputField: Remove  InputField 'onBlur' invalid state handling: calling onChange in the onBlur leads to unpredictable behaviour for developers who are not anticipating onChange to be called when the component loses focus.
- Inputfield (*Breaking*) no longer supports type="date"
## [21.2.0] - 2024-11-01
### Changes
- InputField bug fixes
## [21.1.0] - 2024-10-30
### Changes
- Added ReportDataGrid and ReportDataGrids components as alternative report display components.
## [21.0.0-alpha] - 2024-10-25
### Changes
- InputField component: handle our own number inputs when type="number" as opposed to relying on the html input elements 'number' type. This is a a breaking change since:
 -  Using the scrollwheel to change number inputs is no longer supported
 - decimalPlaces defaults to 2 for number type inputs if user does not specify a a custom value
 ### Deperecated (very breaking)
 Typeahead component, TypeaheadTable component, useSearch hook have all been removed from the package.

## [20.0.0] - 2024-10-23
### Changes
- Communicate whether the AddressUtility is curently 'active' (i.e. the dialog is open) up to its redux container, such that the container only runs the onCreateSuccess function if the dialog is actually open. This hopefully fixes an obscure bug where, if multiple AddressUtility's were being rendered on one page, the onCreateSuccess of the first instance ALWAYS fires regardless of which instance the user was interacting with. This occurs since all instances share the same piece of redux state - its a new address appearing in that piece of redux state that triggers the onCreateSuccess action, which isn't tied to a specific instance of the AddressUtility. This new code essentially forces it to be the case that only one AddressUtility is ever in an 'active' state to hopefully sidestep this nasty bug. This is a breaking change for any clients using the AddressUtility outwith the container, since it no longer handles its own open/closed state (now accepts isActive and setIsActive props to manage this state.)

## [19.6.0] - 2024-09-03
### Changes
- Add optional title string prop to the page component, to allow easily setting the pages title (i.e. the thing that will appear in the browser tab). Also supports an optional additional defaultAppTitle string prop, which will be reverted to when the component unmounts (if passed)
## [19.5.0] - 2024-08-26
### Changes
- Add extra optional 'listFieldName' to collectionStoreFactory, to allow reducers it returns to cope with responses, i.e. the payload.data of the RECEIVE_... action, that are not straight lists. I.e. they are objects, where the array containing the data of interest lives at payload.data[listFieldName] 
## [19.4.0] - 2024-08-26
### Changes
- Add PermissionIndicator - standard indicator as to whether the user has permission for current page.
## [19.3.0] - 2024-07-25
### Changes
- Add onFileSelect function prop to FileUploader, to allow file specifics (name etc) to be passed to parent components for use.
## [19.2.0] - 2024-05-14
### Changes
- Add datePickerProps to DatePicker to allow passing props through to mui datepicker.
## [19.1.0] - 2024-03-27
### Changes
- Export the Navigation presentational component as 'NavigationUI'. Currently only the container is exported as 'Navigation', which contains all of the data-fetching/redux logic.
## [19.0.0] - 2024-02-18
### Changes
- Rework the AddressUtility to handle looking up existing addresses as well as creating new ones. Now also handles its own Dialog open/closed state, and seperates the redux data fetching container from the presentational component to allow it to be reusable in future apps that might not use redux.
## [18.5.0] - 2024-03-15
### Changes
- Add putByHref action to UpdateApiActions to allow PUT-ting to an arbitrary endpoint
## [18.4.1] - 2024-02-13
### Changes
- Allow passing fullwidth prop to the InputField of the Search component
## [18.4.0] - 2023-12-21
### Changes
- Added new ConfirmDialog component
## [18.3.2] - 2023-12-18
### Changes
- Datepicker component - tidy up, handle cases where no min/maxDate props are passed, add some documentation
## [18.3.1] - 2023-12-06
### Changes
- fix Search component docs display bug
## [18.3.0] - 2023-12-05
### Changes
- Add optional display chips to Search components results
## [18.2.0] - 2023-12-01
### Changes
- Add showBackButton prop to SaveBackCancelButtons to optionally not show the back button
## [18.1.0] - 2023-08-15
### Changes
- Add optional oidc access token auth header to the request submitted by the ExportButton, to allow it to access protected resources
## [18.0.2] - 2023-08-14
### Changes
- Revert query string to before they made the package pure ESM to avoid test failures for now
## [18.0.0] - 2023-08-02
## [18.0.1] - 2023-08-14
### Changes
- Make usePreviousNextNavigation hook still return the currentResult when there is only one search result
## [18.0.0] - 2023-08-02
### Changes
- Various npm package updates
## [17.3.3] - 2023-06-21
### Changes
- Revert package-lock updates that seemed to break storybook
## [17.3.2] - 2023-06-21
### Changes
- Additionally return the id of the 'current' result from the usePrevNextNavigation() hook
## [17.3.1] - 2023-06-20
### Changes
- Added new disabled prop to PrevNextButtons component
## [17.3.0] - 2023-06-19
### Changes
- Added new PrevNextButtons component and corresponding usePreviousNextNavigation hook. 
### Changes
## [17.2.1] - 2023-01-11 
### Changes
- fix InputField and Search component autoFocus bugs that resulted from visibility of componenets - you can't autoFocus an input that's invisible which is the case when, for example, the input is in a modal that is currently closed - so needed some way to track the visibility of the input to implement the correct autoFocus behaviour.
## [17.2.0] - 2023-01-10 
### Changes
- add autofocus prop to Search component
## [17.1.2] - 2023-01-06 
- Updated version number as NPM ENV variable and Circle SSH keys were regenerated
## [17.1.0] - 2022-12-21
### Changes
- Add display of report attributes (text-colour, text-weight, background-colour)
## [17.0.0] - 2022-11-3
- removed deprecated stuff: useTablePagination, PaginatedTable, paginationStoreFactory, TableWithInlineEditing, ValidatedInputDialog, GroupEditTable, SingleEditTable, useGroupEditTable
- added onErrorStateChange function prop to InputField to allow it to communicate error state to parent
- added new Search component. See the docs!
### Changes
- Add Address Utility
## [16.1.2] - 2022-11-3
### Changes
- Add Address Utility
## [16.0.2] - 2022-10-26
### Changes
- InputField - error state if max length exceeded
## [16.0.1] - 2022-10-26
### Changes
- Upgrade react router to v6
## [15.0.0] - 2022-09-15
### Changes
- Upgrade react to v18
## [14.0.0] - 2022-09-12
### Changes
- Use mui-x DatePickers
# Changelog
## [13.15.0] - 2022-09-06
### Changes
- Add disabled bool prop to  ExportButton
## [13.14.0] - 2022-08-12
### Changes
- Add optional showRowCount prop to ReportTable to display number of rows found
- Allow null response in reportSelectHelpers.getReportOptions 
## [13.13.0] - 2022-08-10
### Changes
- Improved export button to display a loading spinner and indicate a fail state.
## [13.12.0] - 2022-05-25
### Changes
- Add cases to handle POST actions collectionStoreFactory reducer
## [13.11.0] - 2022-05-23
### Changes
- Add cases to allow updating collections to collectionStoreFactory
- Add missing itemStoreFactory tests
## [13.10.0] - 2022-05-16
### Changes
- Add FileUploader component
- Add optional detailsList to ErrorCard
## [13.9.0] - 2022-05-13
### Changes
- Add handle Return press option to Typeahead. Requires modal, openModalOnClick={false} handleFieldChange={} handleReturnPress={}
- If handleReturnPress is not supplied then behaviour of Typeahead should be as before
## [13.8.1] - 2022-04-28
### Changes
- Update PATCH Endpoint
## [13.8.0] - 2022-04-28
### Changes
- Add PATCH action
## [13.7.1] - 2022-04-12
### Changes
- Disable scroll-wheel editing on number-type InputFields
## [13.7.0] - 2022-03-29
### Changes
- Add postByHref to updateApiActions. Updates item in redux state on receive post
## [13.6.1] - 2022-03-23
### Changes
- Add optional 'required' prop to typeahead component & typeahead table, defaults to false
## [13.6.0] - 2022-03-15
### Changes
- Support optional query parameters in the requestProcessStart creator.  Defaults to null
## [13.5.0] - 2022-03-14
### Changes
- Support arbritrary content types in the requestProcessStart action creator. Defaults to application/json for backwards compatibility.
## [13.4.0] - 2022-02-21
### Changes
- Support optional externalLink field on individual drill downs in ReportTable DisplayUtilites.
## [13.3.0] - 2022-01-14
## [13.2.0] - 2022-01-13
### Changes
- Added optional newTab prop to the LinkButton component that allows external links to be set to open in a new tab. defaults to false.
- Fixed DatePicker error when null value
### Changes
- Added userSelectors as combined object with getName and getUserNumber user selectors.
## [13.1.0] - 2022-01-10
### Added
- Selector helpers: collectionSelectorHelpers, itemSelectorHelpers, paginationSelectionHelpers, processSelectorHelpers, reportSelectorHelpers
- Added getName and getUserNumber user selectors
## [13.0.0] - 2021-12-08
### Changes (Breaking)
- MUI 5
- Integrate application state into Fetch and Update actions

## [12.7.0] - 2021-11-26
### Changes
- Flip processStore working flag to false if the process request errors unexpectedly.

## [12.5.0] - 2021-11-10
### Changes
- Upped react version in dependencies (peer dependencies already was) to react 17
- rewrote tests to get rid of enzyme in order to allow this & removed enzyme from npm and everywhere used
- upgrade other npm packages
- Add wee change to Typeahead to offer built in clear button


## [12.5.0] - 2021-11-10
### Added
- Added replaceRow method to useGroupEditTable hook to allow update of multiple fields at once. Use when changing a field requires dependent fields to also be updated.

## [12.4.0] - 2021-11-09
### Changes
- Add openModalOnClick bool prop to Typeahead when in modal mode to set whether the modal opens as soon as the user interacts with the InputField, or only when they click the magnifying glass Icon. If you want to use it in this configuration you also need to pass a handleFieldChange function that takes the usual (propertyName, newValue) args.

Defaults to true so current behaviour is maintained, i.e. modal opens as soon as user touches field. This basically facilitates optional Typeahead behaviour so a user who doesn't need to search can just enter a value straight in.

## [12.3.0] - 2021-11-03
### Changes
- Add action to clear data to generic FetchApiActions action creators. Process these new actions in the collectionStore reducers.

## [12.2.0] - 2021-10-18
### Changes
- Add functionality to limit and order search results in the Typeahead via passing optional number and function props respectively.

## [12.1.0] - 2021-09-20
### Changes
- Dropdowns's TextField and InputLabel are now linked via the propertyName prop.

## [12.0.1] - 2021-09-15
### Changes
- Update React to v17 and Material UI components.

## [11.8.0] - 2021-09-14
### Changes
- Add fetchByPath to fetch and update actions to allow GETting of uri/id/path 

## [11.7.2] - 2021-09-09
### Changes
- Pass propertyName to InputField's that are wrapped in other components.

## [11.7.0] - 2021-09-03
### Changes
- InputField's TextField and InputLabel are now linked via the propertyName prop, which is now required. This is an accesibility best practise as it allows screen readers etc. to correctly associate labels with input fields, but the benefit to us is that testing library's getByLabelText() document query now works.


## [11.6.0] - 2021-08-31
### Added
- Added componentViewDisplay to editable table column options
- Default option is 'value' which shows value in view mode as before.
- Other option is 'nothing' which shows nothing in view mode but component when editing.

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
