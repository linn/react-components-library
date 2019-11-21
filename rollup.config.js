import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'index.js',
        plugins: [babel({ exclude: 'node_modules/**' }), terser()],
        output: {
            file: 'dist/bundle.min.js',
            format: 'cjs',
            esModule: false
        }
    },
    {
        input: {
            index: 'index.js',
            initialiseOnMount: 'src/components/common/initialiseOnMount.js',
            TypeahedTable: 'src/components/TypeaheadTable.js',
            PaginatedTable: 'src/components/table/PaginatedTable.js',
            TablePaginationActions: 'src/components/table/TablePaginationActions.js',
            Breadcrumbs: 'src/components/Breadcrumbs.js',
            BackButton: 'src/components/BackButton.js',
            CheckboxWithLabel: 'src/components/CheckboxWithLabel.js',
            CreateButton: 'src/components/CreateButton.js',
            DatePicker: 'src/components/DatePicker.js',
            DateTimePicker: 'src/components/DateTimePicker.js',
            Dropdown: 'src/components/Dropdown.js',
            ErrorCard: 'src/components/ErrorCard.js',
            SaveBackCancelButtons: 'src/components/SaveBackCancelButtons.js',
            ReportTable: 'src/components/ReportTable.js',
            Page: 'src/components/Page.js',
            Loading: 'src/components/Loading.js',
            Title: 'src/components/Title.js',
            InputField: 'src/components/InputField.js',
            Typeahead: 'src/components/Typeahead.js',
            EntityList: 'src/components/EntityList.js',
            OnOffSwitch: 'src/components/OnOffSwitch.js',
            SnackbarMessage: 'src/components/SnackbarMessage.js',
            SearcInputField: 'src/components/SearchInputField.js',
            useSearch: 'src/hooks/useSearch.js',
            useTablePagination: 'src/hooks/useTablePagination.js',
            TypeaheadDialog: 'src/components/TypeaheadDialog.js',
            makeActionTypes: 'src/actions/makeActionTypes.js',
            makeReportActionTypes: 'src/actions/makeReportActionTypes.js',
            fetchApiActions: 'src/actions/FetchApiActions.js',
            ReportActions: 'src/actions/ReportActions.js',
            UpdateApiActions: 'src/actions/UpdateApiActions.js',
            ItemType: 'src/types/ItemType.js',
            CollectionSelectors: 'src/selectors/CollectionSelectors.js',
            PaginationSelectors: 'src/selectors/PaginationSelectors.js',
            ItemSelectors: 'src/selectors/ItemSelectors.js',
            ReportSelectors: 'src/selectors/ReportSelectors.js',
            collectionStoreFactory: 'src/reducers/reducerFactories/collectionStoreFactory.js',
            collectionWithLinksStoreFactory:
                'src/reducers/reducerFactories/collectionWithLinksStoreFactory.js',
            itemStoreFactory: 'src/reducers/reducerFactories/itemStoreFactory.js',
            paginationStoreFactory: 'src/reducers/reducerFactories/paginationStoreFactory.js',
            reportOptionsFactory: 'src/reducers/reducerFactories/reportOptionsFactory.js',
            reportResultsFactory: 'src/reducers/reducerFactories/reportResultsFactory.js',
            utilities: 'src/utilities/index.js',
            Navigation: 'src/containers/Navigation.js',
            fetchMenu: 'src/actions/fetchMenu.js',
            fetchNews: 'src/actions/fetchNews.js',
            menu: 'src/reducers/menu.js',
            news: 'src/reducers/news.js',
            markNotificationSeen: 'src/actions/markNotificationSeen.js',
            menuSelectors: 'src/selectors/menuSelectors.js',
            newsSelectors: 'src/selectors/newsSelectors.js',
            getUsername: 'src/selectors/userSelectors.js',
            errorTheme: 'src/themes/errorTheme.js',
            linnTheme: 'src/themes/linnTheme.js',
            fetchError: 'src/reducers/reducerfactories/fetchErrorReducerFactory.js',
            printCss: '/printStyles.css'
        },
        plugins: [babel({ exclude: 'node_modules/**' }), terser()],
        output: [
            {
                dir: 'cjs',
                format: 'cjs'
            }
        ]
    }
];
