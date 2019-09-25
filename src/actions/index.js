﻿export const REQUEST_MENU = 'REQUEST_MENU';
export const RECEIVE_MENU = 'RECEIVE_MENU';

export const REQUEST_NEWS = 'REQUEST_NEWS';
export const RECEIVE_NEWS = 'RECEIVE_NEWS';
export const FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR';
export const FETCH_MENU_ERROR = 'FFTCH_MENU_ERROR';

export const MARK_NOTIFICATION_SEEN = 'MARK_NOTIFICATION_SEEN';

export const CLEAR_ITEM_ERRORS = 'CLEAR_ITEM_ERRORS';

export const FETCH_ERROR = 'FETCH_ERROR';

export const receiveTypes = root => [
    `RECEIVE_${root}`,
    `RECEIVE_${root}_REPORT`,
    `RECEIVE_NEW_${root}`,
    `RECEIVE_UPDATED_${root}`
];
