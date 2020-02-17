import FetchApiActions from './FetchApiActions';
import makeActionTypes from './makeActionTypes';
import config from '../config';

export default new FetchApiActions(
    'news',
    'NEWS',
    '/notifications',
    makeActionTypes('NEWS'),
    config.appRoot
);
