import PropTypes from 'prop-types';

const columnsProps = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string.isRequired,
    component: PropTypes.func,
    editable: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.shape({}), PropTypes.string])),
    required: PropTypes.bool,
    searchLoading: PropTypes.bool,
    searchResults: PropTypes.arrayOf(PropTypes.shape({})),
    searchTitle: PropTypes.string,
    tooltip: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
    clearSearch: PropTypes.func,
    search: PropTypes.func,
    selectSearchResult: PropTypes.func
});

export default columnsProps;
