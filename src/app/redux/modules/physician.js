// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_POST_PHYSICIAN: string = 'REQUEST_POST_PHYSICIAN';
const RECEIVED_POST_PHYSICIAN: string = 'RECEIVED_POST_PHYSICIAN';
const ERROR_POST_PHYSICIAN: string = 'ERROR_POST_PHYSICIAN';

const REQUEST_LIST_PHYSICIAN: string = 'REQUEST_LIST_PHYSICIAN';
const RECEIVED_LIST_PHYSICIAN: string = 'RECEIVED_LIST_PHYSICIAN';
const ERROR_LIST_PHYSICIAN: string = 'ERROR_LIST_PHYSICIAN';

const REQUEST_LIST_PHYSICIANS: string = 'REQUEST_LIST_PHYSICIANS';
const RECEIVED_LIST_PHYSICIANS: string = 'RECEIVED_LIST_PHYSICIANS';
const ERROR_LIST_PHYSICIANS: string = 'ERROR_LIST_PHYSICIANS';

const REQUEST_GET_PHYSICIAN_DATA: string = 'REQUEST_GET_PHYSICIAN_DATA';
const RECEIVED_GET_PHYSICIAN_DATA: string = 'RECEIVED_GET_PHYSICIAN_DATA';
const ERROR_GET_PHYSICIAN_DATA: string = 'ERROR_GET_PHYSICIAN_DATA';

const REQUEST_UPDATE_PHYSICIAN_DATA: string = 'REQUEST_UPDATE_PHYSICIAN_DATA';
const RECEIVED_UPDATE_PHYSICIAN_DATA: string = 'RECEIVED_UPDATE_PHYSICIAN_DATA';
const ERROR_UPDATE_PHYSICIAN_DATA: string = 'ERROR_UPDATE_PHYSICIAN_DATA';

const REQUEST_GET_PHYSICIAN_SPECIALTY_DATA: string = 'REQUEST_GET_PHYSICIAN_SPECIALTY_DATA';
const RECEIVED_GET_PHYSICIAN_SPECIALTY_DATA: string = 'RECEIVED_GET_PHYSICIAN_SPECIALTY_DATA';
const ERROR_GET_PHYSICIAN_SPECIALTY_DATA: string = 'ERROR_GET_PHYSICIAN_SPECIALTY_DATA';

const REQUEST_GET_PHYSICIAN: string = 'REQUEST_GET_PHYSICIAN';
const RECEIVED_GET_PHYSICIAN: string = 'RECEIVED_GET_PHYSICIAN';
const ERROR_GET_PHYSICIAN: string = 'ERROR_GET_PHYSICIAN';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    isFetchingListPhysician: false,
    isFetchingPhysicianData: false,
    isFetchingUpdatePhysicianData: false
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_POST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_POST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_POST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_LIST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingListPhysician: true
            };

        case RECEIVED_LIST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingListPhysician: false,
                data: [...action.payload]
            };

        case ERROR_LIST_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingListPhysician: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: true
            };

        case RECEIVED_GET_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: false,
                data: [...action.payload]
            };

        case ERROR_GET_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_UPDATE_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_UPDATE_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_UPDATE_PHYSICIAN_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_LIST_PHYSICIANS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_LIST_PHYSICIANS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_LIST_PHYSICIANS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_PHYSICIAN_SPECIALTY_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: true
            };

        case RECEIVED_GET_PHYSICIAN_SPECIALTY_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: false,
                data: [...action.payload]
            };

        case ERROR_GET_PHYSICIAN_SPECIALTY_DATA:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingPhysicianData: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_PHYSICIAN:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_PHYSICIAN:
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
function insertPhysician(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/PostPhysician';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'post';
        const headers = {};
        const options = {
            data: { ...data }
        };

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_POST_PHYSICIAN,
                    success: RECEIVED_POST_PHYSICIAN,
                    fail: ERROR_POST_PHYSICIAN
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

export function insertPhysicianIfNeeded(physician: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldInsertPhysician(getState())) {
            return dispatch(insertPhysician(physician));
        }
        return Promise.resolve();
    };
}


function shouldInsertPhysician(state: any): boolean {
    const isFetching = state.physician.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}


function getListPhysician(usuCod: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetPhysicianByHealthUnit';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usuCodHealthUnit=${usuCod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_LIST_PHYSICIAN,
                    success: RECEIVED_LIST_PHYSICIAN,
                    fail: ERROR_LIST_PHYSICIAN
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

export function getListPhysicianIfNeeded(usuCod: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetListPhysician(getState())) {
            return dispatch(getListPhysician(usuCod));
        }
        return Promise.resolve();
    };
}


function getPhysicianSpecialty(esp: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetPhysicianSpecialty';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?esp=${esp}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PHYSICIAN_SPECIALTY_DATA,
                    success: RECEIVED_GET_PHYSICIAN_SPECIALTY_DATA,
                    fail: ERROR_GET_PHYSICIAN_SPECIALTY_DATA
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


export function getPhysicianSpecialtyIfNeeded(esp) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getPhysicianSpecialty(esp));
    }
}

function shouldGetListPhysician(state: any): boolean {
    const isFetching = state.physician.isFetchingListPhysician;
    if (isFetching) {
        return false;
    }
    return true;
}

function getPhysicianData(usuCod: string, crm: string, crm_uf: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetPhysicianRegistrationData';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usucod=${usuCod}&crm=${crm}&uf=${crm_uf}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_LIST_PHYSICIAN,
                    success: RECEIVED_LIST_PHYSICIAN,
                    fail: ERROR_LIST_PHYSICIAN
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

function getPhysicianCRMCamData(crm: string, crm_uf: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetPhysicianByCRMCam';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?crm=${crm}&uf=${crm_uf}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PHYSICIAN,
                    success: RECEIVED_GET_PHYSICIAN,
                    fail: ERROR_GET_PHYSICIAN
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

export function getPhysicianCRMCamDataIfNeeded(crm: string, crm_uf: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetPhysicianData(getState())) {
            return dispatch(getPhysicianCRMCamData(crm, crm_uf));
        }
        return Promise.resolve();
    };
}

export function getPhysicianDataIfNeeded(usuCod: string, crm: string, crm_uf: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetPhysicianData(getState())) {
            return dispatch(getPhysicianData(usuCod, crm, crm_uf));
        }
        return Promise.resolve();
    };
}

function shouldGetPhysicianData(state: any): boolean {
    const isFetching = state.physician.isFetchingListPhysician;
    if (isFetching) {
        return false;
    }
    return true;
}


function updatePhysician(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/UpdatePhysician';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'post';
        const headers = {};
        const options = {
            data: { ...data }
        };

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_UPDATE_PHYSICIAN_DATA,
                    success: RECEIVED_UPDATE_PHYSICIAN_DATA,
                    fail: ERROR_UPDATE_PHYSICIAN_DATA
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


export function updatePhysicianIfNeeded(physician: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldUpdatePhysician(getState())) {
            return dispatch(updatePhysician(physician));
        }
        return Promise.resolve();
    };
}


function shouldUpdatePhysician(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getPhysicianList(usucod: int) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetList';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usucod=${usucod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_LIST_PHYSICIANS,
                    success: RECEIVED_LIST_PHYSICIANS,
                    fail: ERROR_LIST_PHYSICIANS
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

function getListByUsucod(usucod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Physician/GetListByUsucod';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usucod=${usucod}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_LIST_PHYSICIANS,
                    success: RECEIVED_LIST_PHYSICIANS,
                    fail: ERROR_LIST_PHYSICIANS
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

export function getPhysicianListIfNeeded(usucod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetPhysicianList(getState())) {
            return dispatch(getPhysicianList(usucod));
        }
        return Promise.resolve();
    };
}

export function getPhysicianListByUsucodIfNeeded(usucod): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetPhysicianList(getState())) {
            return dispatch(getListByUsucod(usucod));
        }
        return Promise.resolve();
    };
}

function shouldGetPhysicianList(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}
