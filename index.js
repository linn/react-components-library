import BackButton from './src/components/BackButton';
import ExportButton from './src/components/ExportButton';
import Breadcrumbs from './src/components/Breadcrumbs';
import SaveBackCancelButtons from './src/components/SaveBackCancelButtons';
import Loading from './src/components/Loading';
import Dropdown from './src/components/Dropdown';
import ErrorCard from './src/components/ErrorCard';
import CheckboxWithLabel from './src/components/CheckboxWithLabel';
import InputField from './src/components/InputField';
import LinkButton from './src/components/LinkButton';
import Page from './src/components/Page';
import EntityList from './src/components/EntityList';
import CreateButton from './src/components/CreateButton';
import OnOffSwitch from './src/components/OnOffSwitch';
import SnackbarMessage from './src/components/SnackbarMessage';
import DatePicker from './src/components/DatePicker';
import DateTimePicker from './src/components/DateTimePicker';
import SearchInputField from './src/components/SearchInputField';
import makeActionTypes from './src/actions/makeActionTypes';
import makeReportActionTypes from './src/actions/makeReportActionTypes';
import makeProcessActionTypes from './src/actions/makeProcessActionTypes';
import FetchApiActions from './src/actions/FetchApiActions';
import ProcessActions from './src/actions/ProcessActions';
import ReportActions from './src/actions/ReportActions';
import UpdateApiActions from './src/actions/UpdateApiActions';
import StateApiActions from './src/actions/StateApiActions';
import fetchNews from './src/actions/fetchNews';
import markNotificationSeen from './src/actions/markNotificationSeen';
import fetchMenu from './src/actions/fetchMenu';
import ItemType from './src/types/ItemType';
import collectionSelectorHelpers from './src/selectors/collectionSelectorHelpers';
import paginationSelectorHelpers from './src/selectors/paginationSelectorHelpers';
import itemSelectorHelpers from './src/selectors/itemSelectorHelpers';
import reportSelectorHelpers from './src/selectors/reportSelectorHelpers';
import processSelectorHelpers from './src/selectors/processSelectorHelpers';
import CollectionSelectors from './src/selectors/CollectionSelectors';
import PaginationSelectors from './src/selectors/PaginationSelectors';
import ItemSelectors from './src/selectors/ItemSelectors';
import ReportSelectors from './src/selectors/ReportSelectors';
import ProcessSelectors from './src/selectors/ProcessSelectors';
import collectionStoreFactory from './src/reducers/reducerFactories/collectionStoreFactory';
import collectionWithLinksStoreFactory from './src/reducers/reducerFactories/collectionWithLinksStoreFactory';
import processStoreFactory from './src/reducers/reducerFactories/processStoreFactory';
import itemStoreFactory from './src/reducers/reducerFactories/itemStoreFactory';
import reportOptionsFactory from './src/reducers/reducerFactories/reportOptionsFactory';
import reportResultsFactory from './src/reducers/reducerFactories/reportResultsFactory';
import reportsResultsFactory from './src/reducers/reducerFactories/reportsResultsFactory';
import fetchErrorReducerFactory from './src/reducers/reducerFactories/fetchErrorReducerFactory';
import menu from './src/reducers/menu';
import news from './src/reducers/news';
import menuSelectors from './src/selectors/menuSelectors';
import newsSelectors from './src/selectors/newsSelectors';
import getUsername from './src/selectors/legacyUserSelectors';
import userSelectors from './src/selectors/userSelectors';
import utilities from './src/utilities/index';
import initialiseOnMount from './src/components/common/initialiseOnMount';
import Navigation from './src/containers/Navigation';
import NavigationUI from './src/components/Navigation';

import {
    getItemError,
    getRequestErrors,
    getItemErrors,
    getItemErrorDetailMessage
} from './src/selectors/errorSelectors';
import linnTheme from './src/themes/linnTheme';
import SelectedItemsList from './src/components/SelectedItemsList';
import NotFound from './src/components/NotFound';
import LinnWeekPicker from './src/components/LinnWeekPicker';
import { getWeekEndDate, getWeekStartDate } from './src/utilities/dateUtilities';
import './src/styles/printStyles.css';
import getPreviousPaths from './src/selectors/previousPathSelectors';
import smartGoBack from './src/utilities/smartGoBack';
import FileUploader from './src/components/FileUploader';
import AddressUtility from './src/components/AddressUtility';
import Search from './src/components/Search';
import usePreviousNextNavigation from './src/hooks/usePreviousNextNavigation';
import PrevNextButtons from './src/components/PrevNextButtons';
import ConfirmDialog from './src/components/ConfirmDialog';
import AddressUtilityReduxContainer from './src/containers/AddressUtilityReduxContainer';
import PermissionIndicator from './src/components/PermissionIndicator';
import ReportDataGrid from './src/components/ReportDataGrid';
import ReportDataGrids from './src/components/ReportDataGrids';
import LinkField from './src/components/LinkField';

const reducers = { menu, news };

export {
    AddressUtility,
    AddressUtilityReduxContainer,
    BackButton,
    Breadcrumbs,
    CheckboxWithLabel,
    ConfirmDialog,
    collectionSelectorHelpers,
    CollectionSelectors,
    collectionStoreFactory,
    collectionWithLinksStoreFactory,
    CreateButton,
    DatePicker,
    DateTimePicker,
    Dropdown,
    EntityList,
    ErrorCard,
    ExportButton,
    FetchApiActions,
    fetchErrorReducerFactory as fetchErrorReducer,
    fetchMenu,
    fetchNews,
    FileUploader,
    getItemError,
    getItemErrorDetailMessage,
    getItemErrors,
    getPreviousPaths,
    getRequestErrors,
    getUsername,
    getWeekEndDate,
    getWeekStartDate,
    initialiseOnMount,
    InputField,
    itemSelectorHelpers,
    ItemSelectors,
    itemStoreFactory,
    ItemType,
    linnTheme,
    LinnWeekPicker,
    LinkButton,
    LinkField,
    Loading,
    makeActionTypes,
    makeProcessActionTypes,
    makeReportActionTypes,
    markNotificationSeen,
    menu,
    menuSelectors,
    Navigation,
    NavigationUI,
    news,
    newsSelectors,
    NotFound,
    OnOffSwitch,
    Page,
    paginationSelectorHelpers,
    PaginationSelectors,
    PermissionIndicator,
    PrevNextButtons,
    ProcessActions,
    processSelectorHelpers,
    ProcessSelectors,
    processStoreFactory,
    reducers,
    ReportActions,
    ReportDataGrid,
    ReportDataGrids,
    reportOptionsFactory,
    reportResultsFactory,
    reportSelectorHelpers,
    ReportSelectors,
    reportsResultsFactory,
    SaveBackCancelButtons,
    Search,
    SearchInputField,
    SelectedItemsList,
    smartGoBack,
    SnackbarMessage,
    StateApiActions,
    UpdateApiActions,
    userSelectors,
    usePreviousNextNavigation,
    utilities
};
