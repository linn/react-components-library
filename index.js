import BackButton from './src/components/BackButton';
import ExportButton from './src/components/ExportButton';
import Breadcrumbs from './src/components/Breadcrumbs';
import SaveBackCancelButtons from './src/components/SaveBackCancelButtons';
import ReportTable from './src/components/ReportTable';
import Loading from './src/components/Loading';
import Dropdown from './src/components/Dropdown';
import ErrorCard from './src/components/ErrorCard';
import CheckboxWithLabel from './src/components/CheckboxWithLabel';
import Title from './src/components/Title';
import InputField from './src/components/InputField';
import Typeahead from './src/components/Typeahead';
import Page from './src/components/Page';
import EntityList from './src/components/EntityList';
import CreateButton from './src/components/CreateButton';
import OnOffSwitch from './src/components/OnOffSwitch';
import SnackbarMessage from './src/components/SnackbarMessage';
import SearchInputField from './src/components/SearchInputField';
import useSearch from './src/hooks/useSearch';
import useTablePagination from './src/hooks/useTablePagination';
import PaginatedTable from './src/components/table/PaginatedTable';
import InfiniteTable from './src/components/table/InfiniteTable';
import TypeaheadDialog from './src/components/TypeaheadDialog';
import { makeActionTypes, makeReportActionTypes } from './src/actions/index';
import FetchApiActions from './src/actions/FetchApiActions';
import ReportActions from './src/actions/ReportActions';
import UpdateApiActions from './src/actions/UpdateApiActions';
import { fetchMenu, fetchNews, markNotificationSeen } from './src/actions/menuActions';
import ItemType from './src/types/ItemType';
import CollectionSelectors from './src/selectors/CollectionSelectors';
import PaginationSelectors from './src/selectors/PaginationSelectors';
import ItemSelectors from './src/selectors/ItemSelectors';
import ReportSelectors from './src/selectors/ReportSelectors';
import fetchErrorSelectors from './src/selectors/fetchErrorSelectors';
import collectionStoreFactory from './src/reducers/reducerFactories/collectionStoreFactory';
import collectionWithLinksStoreFactory from './src/reducers/reducerFactories/collectionWithLinksStoreFactory';
import itemStoreFactory from './src/reducers/reducerFactories/itemStoreFactory';
import paginationStoreFactory from './src/reducers/reducerFactories/paginationStoreFactory';
import reportOptionsFactory from './src/reducers/reducerFactories/reportOptionsFactory';
import reportResultsFactory from './src/reducers/reducerFactories/reportResultsFactory';
import fetchErrorReducer from './src/reducers/fetchErrorReducer';
import menu from './src/reducers/menu';
import news from './src/reducers/news';
import {
    getSections,
    getMenuSection,
    getMyStuff,
    getMenuLoading
} from './src/selectors/menuSelectors';
import {
    getSeenNotifications,
    getUnseenNotifications,
    getNewsLoading
} from './src/selectors/newsSelectors';
import getUsername from './src/selectors/userSelectors';
import { getHref, getSelfHref } from './src/utilities/index';
import initialiseOnMount from './src/components/common/initialiseOnMount';
import Navigation from './src/containers/Navigation';
import { errorTheme, linnTheme } from './src/themes/index';

const reducers = { menu, news, fetchError: fetchErrorReducer };

export {
    InfiniteTable,
    PaginatedTable,
    Breadcrumbs,
    BackButton,
    CreateButton,
    CheckboxWithLabel,
    Dropdown,
    ErrorCard,
    SaveBackCancelButtons,
    ReportTable,
    ExportButton,
    Page,
    Loading,
    Title,
    InputField,
    Typeahead,
    EntityList,
    OnOffSwitch,
    SnackbarMessage,
    SearchInputField,
    useSearch,
    useTablePagination,
    TypeaheadDialog,
    makeActionTypes,
    makeReportActionTypes,
    FetchApiActions,
    ReportActions,
    UpdateApiActions,
    ItemType,
    CollectionSelectors,
    PaginationSelectors,
    ItemSelectors,
    ReportSelectors,
    fetchErrorSelectors,
    collectionStoreFactory,
    collectionWithLinksStoreFactory,
    itemStoreFactory,
    paginationStoreFactory,
    reportOptionsFactory,
    reportResultsFactory,
    getHref,
    getSelfHref,
    initialiseOnMount,
    Navigation,
    fetchMenu,
    fetchNews,
    menu,
    news,
    markNotificationSeen,
    getSections,
    getMenuSection,
    getMyStuff,
    getMenuLoading,
    getSeenNotifications,
    getUnseenNotifications,
    getNewsLoading,
    getUsername,
    errorTheme,
    linnTheme,
    reducers
};
