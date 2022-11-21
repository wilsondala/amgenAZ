// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------

const REQUEST_GET_INSTITUTION:     string = 'REQUEST_GET_INSTITUTION';
const RECEIVED_GET_INSTITUTION:    string = 'RECEIVED_GET_INSTITUTION';
const ERROR_GET_INSTITUTION:       string = 'ERROR_GET_INSTITUTION';

const REQUEST_POST_INSTITUTION: string = 'REQUEST_POST_INSTITUTION';
const RECEIVED_POST_INSTITUTION: string = 'RECEIVED_POST_INSTITUTION';
const ERROR_POST_INSTITUTION: string = 'ERROR_POST_INSTITUTION';

 const REQUEST_UPDATE_INSTITUTION_PROFILE: string =  'REQUEST_UPDATE_INSTITUTION_PROFILE';
const RECEIVED_UPDATE_INSTITUTION_PROFILE: string = 'RECEIVED_UPDATE_INSTITUTION_PROFILE';
   const ERROR_UPDATE_INSTITUTION_PROFILE: string =    'ERROR_UPDATE_INSTITUTION_PROFILE';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    isFetchingUpdateProfile: false,
    isFetchingGet: false,
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_GET_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingGet: true
            };

        case RECEIVED_GET_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingGet: false,
                data: [...action.payload]
            };

        case ERROR_GET_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingGet: false,
                error: action.error ? { ...action.error } : {}
            };
        case REQUEST_POST_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_POST_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_POST_INSTITUTION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_UPDATE_INSTITUTION_PROFILE:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingUpdateProfile: true
            };

        case RECEIVED_UPDATE_INSTITUTION_PROFILE:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingUpdateProfile: false,
                data: [...action.payload]
            };

        case ERROR_UPDATE_INSTITUTION_PROFILE:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingUpdateProfile: false,
                error: action.error ? { ...action.error } : {}
            };
        default:
            return state;
    }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

function getInstitutionList() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Institution/GetList';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'get';
        const headers = {};
        const options     = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_INSTITUTION,
                    success: RECEIVED_GET_INSTITUTION,
                    fail: ERROR_GET_INSTITUTION
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

export function getInstitutionListIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetInstitution(getState())) {
            return dispatch(getInstitutionList());
        }
        return Promise.resolve();
    };
}

function shouldGetInstitution(state: any): boolean {
    const isFetching = state.institution.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function insertInstitution(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/InsertHealthUnit';
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
                    request: REQUEST_POST_INSTITUTION,
                    success: RECEIVED_POST_INSTITUTION,
                    fail: ERROR_POST_INSTITUTION
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

export function insertInstitutionIfNeeded(institution: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldInsertInstitution(getState())) {
            return dispatch(insertInstitution(institution));
        }
        return Promise.resolve();
    };
}

function shouldInsertInstitution(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function getInstitution(cnpj, usucod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/GetByCnpjUsucod';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?cnpj=${cnpj}&usucod=${usucod}`;
        const method = 'get';
        const headers = {};
        const options     = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_INSTITUTION,
                    success: RECEIVED_GET_INSTITUTION,
                    fail: ERROR_GET_INSTITUTION
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
    

export function getInstitutionIfNeeded(cnpj: string, usucod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetInstitution(getState())) {
            return dispatch(getInstitution(cnpj, usucod));
        }
        return Promise.resolve();
    };
}

function shouldGetInstitution(state: any): boolean {
    const isFetchingGet = state.isFetchingGet;
    if (isFetchingGet) {
        return false;
    }
    return true;
}


function updateInstitutionProfile(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/HealthUnit/UpdateHealthUnitProfile';
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
                    request: REQUEST_UPDATE_INSTITUTION_PROFILE,
                    success: RECEIVED_UPDATE_INSTITUTION_PROFILE,
                    fail: ERROR_UPDATE_INSTITUTION_PROFILE
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

export function updateInstitutionProfileIfNeeded(institution: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldUpdateInstitutionProfile(getState())) {
            return dispatch(updateInstitutionProfile(institution));
        }
        return Promise.resolve();
    };
}

function shouldUpdateInstitutionProfile(state: any): boolean {
    const isFetchingUpdateProfile = state.isFetchingUpdateProfile;
    if (isFetchingUpdateProfile) {
        return false;
    }
    return true;
}
