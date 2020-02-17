import FetchApiActions from './FetchApiActions';
import makeActionTypes from './makeActionTypes';
import config from '../config';
import * as itemTypes from '../itemTypes';

export default new FetchApiActions(
    itemTypes.menu.item,
    itemTypes.menu.actionType,
    itemTypes.menu.uri,
    makeActionTypes(itemTypes.menu.actionType),
    config.proxyRoot,
    false
);
