// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';


// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_GET_KIT_SOLICITATION_REPORT:             string = 'REQUEST_GET_KIT_SOLICITATION_REPORT';
const RECEIVED_GET_KIT_SOLICITATION_REPORT:            string = 'RECEIVED_GET_KIT_SOLICITATION_REPORT';
const ERROR_GET_KIT_SOLICITATION_REPORT:               string = 'ERROR_GET_KIT_SOLICITATION_REPORT';

const REQUEST_POST_KIT:                                string = 'REQUEST_POST_KIT';
const RECEIVED_POST_KIT:                               string = 'RECEIVED_POST_KIT';
const ERROR_POST_KIT:                                  string = 'ERROR_POST_KIT';

const REQUEST_GET_LIST: string = 'REQUEST_PREQUEST_GET_LISTOST_KIT';
const RECEIVED_GET_LIST: string = 'RECEIVED_GET_LIST';
const ERROR_GET_LIST: string = 'ERROR_GET_LIST';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    isFetchingReport: false
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_GET_KIT_SOLICITATION_REPORT:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingReport: true
            };

        case RECEIVED_GET_KIT_SOLICITATION_REPORT:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingReport: false,
                data: [...action.payload]
            };

        case ERROR_GET_KIT_SOLICITATION_REPORT:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingReport: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_POST_KIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_POST_KIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_POST_KIT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_LIST:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_LIST:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_LIST:
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
function getKitSolicitationReport(userId: any, status: any, InitialDate: any, FinalDate: any,
                                    physicianCod: any, requestType: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Kit/GetKitSolicitationReport';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?userId=${userId}&InitialDate=${InitialDate}&FinalDate=${FinalDate}&physicianCod=${physicianCod}&status=${status}&requestType=${requestType}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_KIT_SOLICITATION_REPORT,
                    success: RECEIVED_GET_KIT_SOLICITATION_REPORT,
                    fail: ERROR_GET_KIT_SOLICITATION_REPORT
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


function getKitList() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Kit/GetList';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_LIST,
                    success: RECEIVED_GET_LIST,
                    fail: ERROR_GET_LIST
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

export function getKitSolicitationReportIfNeeded(userId: any, status: any, InitialDate: any, FinalDate: any, physicianCod: any, requestType: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {   
            if(shouldReport(getState())){
                return dispatch(getKitSolicitationReport(userId, status, InitialDate, FinalDate, physicianCod, requestType));        
            }
        return Promise.resolve();
    };
}

export function insertKitSolicitationIfNeeded(solicitation: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldKit(getState())){
            return dispatch(insertKitSolicitation(solicitation));
        }
        return Promise.resolve();
    };
}

export function getKitListIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getKitList());
    };
}

function shouldKit(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function shouldReport(state: any): boolean {
    const isFetchingReport = state.isFetchingReport;
    if (isFetchingReport) {
        return false;
    }
    return true;
}