## [10.2.4] - 2020-01-06

## Changed
- Fixed forgotten tests for loading inside application state 

## [10.2.3] - 2019-12-0

## Changed
- Add loading inside application state in item & collection factory reducers and selectors

## [10.2.1] - 2019-12-0

## Changed
- Pass placeholder text prop to the InputField in the modal as well as the main one.

## [10.2.0] - 2019-12-0

## Changed

- Extended the Typeahead to be more flexible than a search that just links you to other pages. It now takes an onSelect action as an optional prop such that you can define custom behaviour, and a links boolean which you can set to false to override the default behaviour of navigating to a new page onSelect. You should provide an onSelect function and a links={false} configuration if custom behaviour is required ( and conversely should not provide an onSelect and a links={true} config, since any onSelect() bheaviour is ignored if links is true anyway). 

Now also takes an optional modal boolean prop which lets you display search results in a modal as opposed to below the search which is useful for using this in a form where there isn't space to displau search results in the same plane as the field.

The two new props have default values such that original use cases are respected - i.e. links={true} and modal={false} - hence no breaking changes in this version.

# Changelog
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
