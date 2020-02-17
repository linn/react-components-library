import FetchApiActions from './FetchApiActions';
import makeActionTypes from './makeActionTypes';
import config from '../config';

export default new FetchApiActions(
    'menu',
    'MENU',
    '/intranet/menu-no-auth',
    makeActionTypes('MENU'),
    config.proxyRoot,
    false
);
