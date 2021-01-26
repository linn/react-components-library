import PropTypes from 'prop-types';

const columnsProps = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string.isRequired,
    component: PropTypes.func,
    editable: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string, PropTypes.number])
    ),
    required: PropTypes.bool,
    searchLoading: PropTypes.bool,
    searchResults: PropTypes.arrayOf(PropTypes.shape({})),
    searchTitle: PropTypes.string,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    clearSearch: PropTypes.func,
    closeRowOnClickAway: PropTypes.func,
    search: PropTypes.func,
    selectSearchResult: PropTypes.func,
    minimumSearchTermLength: PropTypes.number
});

export default columnsProps;
