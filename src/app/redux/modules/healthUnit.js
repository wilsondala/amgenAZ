// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------

const REQUEST_GET_HEALTH_UNIT: string = 'REQUEST_GET_HEALTH_UNIT';
const RECEIVED_GET_HEALTH_UNIT: string = 'RECEIVED_GET_HEALTH_UNIT';
const ERROR_GET_HEALTH_UNIT: string = 'ERROR_GET_HEALTH_UNIT';

const REQUEST_GET_HEALTH_UNIT_BY_USUCOD: string = 'REQUEST_GET_HEALTH_UNIT_BY_USUCOD';
const RECEIVED_GET_HEALTH_UNIT_BY_USUCOD: string = 'RECEIVED_GET_HEALTH_UNIT_BY_USUCOD';
const ERROR_GET_HEALTH_UNIT_BY_USUCOD: string = 'ERROR_GET_HEALTH_UNIT_BY_USUCOD';

const REQUEST_ALTER_HEALTH_UNIT_BY_AGECOD: string = 'REQUEST_ALTER_HEALTH_UNIT_BY_AGECOD';
const RECEIVED_ALTER_HEALTH_UNIT_BY_AGECOD: string = 'RECEIVED_ALTER_HEALTH_UNIT_BY_AGECOD';
const ERROR_ALTER_HEALTH_UNIT_BY_AGECOD: string = 'ERROR_ALTER_HEALTH_UNIT_BY_AGECOD';

const  REQUEST_GET_HEALTH_UNIT_LIST: string =  'REQUEST_GET_HEALTH_UNIT_LIST';
const RECEIVED_GET_HEALTH_UNIT_LIST: string = 'RECEIVED_GET_HEALTH_UNIT_LIST';
const    ERROR_GET_HEALTH_UNIT_LIST: string =    'ERROR_GET_HEALTH_UNIT_LIST';


// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    retornoHealthUnit: [],
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_GET_HEALTH_UNIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_HEALTH_UNIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_HEALTH_UNIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_ALTER_HEALTH_UNIT_BY_AGECOD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_ALTER_HEALTH_UNIT_BY_AGECOD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_ALTER_HEALTH_UNIT_BY_AGECOD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };
        
        case REQUEST_GET_HEALTH_UNIT_LIST:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_HEALTH_UNIT_LIST:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                retornoHealthUnit: action.payload.data
            };

        case ERROR_GET_HEALTH_UNIT_LIST:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        default:
            return state;
    }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function getHealthUnitByUsucod(usucod: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/Get';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?userId=${usucod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_HEALTH_UNIT_BY_USUCOD,
                    success: RECEIVED_GET_HEALTH_UNIT_BY_USUCOD,
                    fail: ERROR_GET_HEALTH_UNIT_BY_USUCOD
                },
                // mock fetch props:
                mockResult,
                // real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
}

function getHealthUnitByUnscod(unscod: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/GetByUnsCod';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?unscod=${unscod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_HEALTH_UNIT,
                    success: RECEIVED_GET_HEALTH_UNIT,
                    fail: ERROR_GET_HEALTH_UNIT
                },
                // mock fetch props:
                mockResult,
                // real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
}

function getHealthUnitList(userTypeId: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/GetList';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?userTypeId=${userTypeId}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request:  REQUEST_GET_HEALTH_UNIT_LIST,
                    success: RECEIVED_GET_HEALTH_UNIT_LIST,
                    fail:       ERROR_GET_HEALTH_UNIT_LIST
                },
                // mock fetch props:
                mockResult,
                // real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
}


function getHealthUnitListByUsucod(userId: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/GetListByUsucod';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usucod=${userId}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_HEALTH_UNIT,
                    success: RECEIVED_GET_HEALTH_UNIT,
                    fail: ERROR_GET_HEALTH_UNIT
                },
                // mock fetch props:
                mockResult,
                // real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
}

function alterHealthUnit(ageCod, unsCod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/AlterHealthUnit';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?ageCod=${ageCod}&unsCod=${unsCod}`;
        const method = 'POST';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_ALTER_HEALTH_UNIT_BY_AGECOD,
                    success: RECEIVED_ALTER_HEALTH_UNIT_BY_AGECOD,
                    fail: ERROR_ALTER_HEALTH_UNIT_BY_AGECOD
                },
                // mock fetch props:
                mockResult,
                // real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
}

export function getHealthUnitListIfNeeded(userTypeId: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetHealthUnitByUsuCod(getState())) {
            return dispatch(getHealthUnitList(userTypeId));
        }
        return Promise.resolve();
    };
}

export function getHealthUnitByUnscodIfNeeded(unscod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => int): any => {
        if (shouldGetHealthUnitByUsuCod(getState())) {
            return dispatch(getHealthUnitByUnscod(unscod));
        }
        return Promise.resolve();
    };
}

export function getHealthUnitByUsucodIfNeeded(usucod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => int): any => {
        if (shouldGetHealthUnitByUsuCod(getState())) {
            return dispatch(getHealthUnitByUsucod(usucod));
        }
        return Promise.resolve();
    };
}

export function getHealthUnitListByUsucodIfNeeded(usucod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => int): any => {
        return dispatch(getHealthUnitListByUsucod(usucod));
    };
}

export function alterHealthUnitIfNeeded(agecod, unscod){
    return (dispatch: (any) => any, getState: () => boolean) : any => {
        if (shouldGetHealthUnitByUsuCod(getState())) {
            return dispatch(alterHealthUnit(agecod, unscod));
        }
        return Promise.resolve();
    }
}


function shouldGetHealthUnitByUsuCod(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}