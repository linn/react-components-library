import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const babelrc = {
    presets: ['@babel/preset-env', '@babel/react'],
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining']
};

export default [
    {
        input: 'index.js',
        plugins: [
            babel({ babelrc: false, ...babelrc, exclude: 'node_modules/**' }),
            terser({ keep_fnames: true }),
            postcss({
                extensions: ['.css']
            })
        ],
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
            Breadcrumbs: 'src/components/Breadcrumbs.js',
            BackButton: 'src/components/BackButton.js',
            CheckboxWithLabel: 'src/components/CheckboxWithLabel.js',
            CreateButton: 'src/components/CreateButton.js',
            DatePicker: 'src/components/DatePicker.js',
            DateTimePicker: 'src/components/DateTimePicker.js',
            Dropdown: 'src/components/Dropdown.js',
            ErrorCard: 'src/components/ErrorCard.js',
            SaveBackCancelButtons: 'src/components/SaveBackCancelButtons.js',
            Page: 'src/components/Page.js',
            Loading: 'src/components/Loading.js',
            InputField: 'src/components/InputField.js',
            LinkField: 'src/components/LinkField.js',
            EntityList: 'src/components/EntityList.js',
            OnOffSwitch: 'src/components/OnOffSwitch.js',
            SnackbarMessage: 'src/components/SnackbarMessage.js',
            SearcInputField: 'src/components/SearchInputField.js',
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
            reportOptionsFactory: 'src/reducers/reducerFactories/reportOptionsFactory.js',
            reportResultsFactory: 'src/reducers/reducerFactories/reportResultsFactory.js',
            utilities: 'src/utilities/index.js',
            Navigation: 'src/containers/Navigation.js',
            NavigationUI: 'src/components/Navigation',
            fetchMenu: 'src/actions/fetchMenu.js',
            fetchNews: 'src/actions/fetchNews.js',
            menu: 'src/reducers/menu.js',
            news: 'src/reducers/news.js',
            markNotificationSeen: 'src/actions/markNotificationSeen.js',
            menuSelectors: 'src/selectors/menuSelectors.js',
            newsSelectors: 'src/selectors/newsSelectors.js',
            getUsername: 'src/selectors/legacyUserSelectors.js',
            linnTheme: 'src/themes/linnTheme.js',
            fetchError: 'src/reducers/reducerFactories/fetchErrorReducerFactory.js',
            FileUploader: 'src/components/FileUploader.js',
            AddressUtility: 'src/components/AddressUtility.js',
            AddressUtilityReduxContainer: 'src/containers/AddressUtilityReduxContainer.js',
            UsePreviousNextNavigation: 'src/hooks/usePreviousNextNavigation',
            PrevNextButtons: 'src/components/PrevNextButtons',
            ConfirmDialog: 'src/components/ConfirmDialog.js',
            PermissionIndicator: 'src/components/PermissionIndicator.js',
            ReportDataGrid: 'src/components/ReportDataGrid.js',
            ReportDataGrids: 'src/components/ReportDataGrids.js'
        },
        plugins: [
            babel({ babelrc: false, ...babelrc, exclude: 'node_modules/**' }),
            terser({ keep_fnames: true }),
            postcss({
                extensions: ['.css']
            })
        ],
        output: [
            {
                dir: 'cjs',
                format: 'cjs'
            }
        ]
    }
];
