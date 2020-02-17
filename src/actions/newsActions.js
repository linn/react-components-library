import FetchApiActions from './FetchApiActions';
import makeActionTypes from './makeActionTypes';
import config from '../config';
import * as itemTypes from '../itemTypes';

export default new FetchApiActions(
    itemTypes.news.item,
    itemTypes.news.actionType,
    itemTypes.news.uri,
    makeActionTypes(itemTypes.news.actionType),
    config.proxyRoot
);
