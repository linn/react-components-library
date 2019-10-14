# Changelog
## [7.3.0] - 2019-10-10

### Changed

- Changed initialiseOnMount to pass props into initialise when itemId not provided.
## [7.2.1] - 2019-10-10

### Added

- Added makeProcessActionTypes and new rsaaType for process

## [7.2.0] - 2019-10-08

### Added

-   New Component - ValidatedInputDialog

### Changed

- Fixed broken stories.

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
        ```import { getHref } from '@linn/react-components-library'```
        should now be
        ```import { utilites } from '@linn/react-components-library'```
        and used as
        ```utilities.getHref(item)```
-   Rollup config
-   Bundle splitting
