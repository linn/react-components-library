# Changelog

## [7.0.3] - 2019-10-04
### Added
- CHANGELOG.md

## [7.0.2] - 2019-10-03
### Added
- Export error details message selector

## [7.0.1] - 2019-10-02
### Added
- Fetch error details message selector

## [7.0.0] - 2019-09-26
### Added
- Report errors
- TODO add steps to update here + maybe an example?

## [6.0.0] - 2019-09-23
### Added
- New error style
- TODO add steps to update here + maybe an example?

### Changed
- action types to shared rsaa types

## [5.0.0] - 2019-16-08
### Added
- Date time picker

### Changed
- Utilites functions exported from utilites file
    - All imports must be updated ```import { getHref } from '@linn/react-components-library'```  should now be ```import { utilites } from '@linn/react-components-library'``` and used as ```utilities.getHref(item)```
- Rollup config
- Bundle splitting
