// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_POST_PATIENT: string = 'REQUEST_POST_PATIENT';
const RECEIVED_POST_PATIENT: string = 'RECEIVED_POST_PATIENT';
const ERROR_POST_PATIENT: string = 'ERROR_POST_PATIENT';

const REQUEST_GET_PATIENT: string = 'REQUEST_GET_PATIENT';
const RECEIVED_GET_PATIENT: string = 'RECEIVED_GET_PATIENT';
const ERROR_GET_PATIENT: string = 'ERROR_GET_PATIENT';

const REQUEST_GET_TREATMENT: string = 'REQUEST_GET_TREATMENT';
const RECEIVED_GET_TREATMENT: string = 'RECEIVED_GET_TREATMENT';
const ERROR_GET_TREATMENT: string = 'ERROR_GET_TREATMENT';

const REQUEST_GET_COMPLEMENTARYTREATMENT: string = 'REQUEST_GET_COMPLEMENTARYTREATMENT';
const RECEIVED_GET_COMPLEMENTARYTREATMENT: string = 'RECEIVED_GET_COMPLEMENTARYTREATMENT';
const ERROR_GET_COMPLEMENTARYTREATMENT: string = 'ERROR_GET_COMPLEMENTARYTREATMENT';

const REQUEST_GET_PHASE: string = 'REQUEST_GET_PHASE';
const RECEIVED_GET_PHASE: string = 'RECEIVED_GET_PHASE';
const ERROR_GET_PHASE: string = 'ERROR_GET_PHASE';

const REQUEST_GET_HEALTHCAREPROVIDER: string = 'REQUEST_GET_HEALTHCAREPROVIDER';
const RECEIVED_GET_HEALTHCAREPROVIDER: string = 'RECEIVED_GET_HEALTHCAREPROVIDER';
const ERROR_GET_HEALTHCAREPROVIDER: string = 'ERROR_GET_HEALTHCAREPROVIDER';

const REQUEST_GET_VALIDATEHIRTYMONTHS: string = 'REQUEST_GET_VALIDATEHIRTYMONTHS';
const RECEIVED_GET_VALIDATEHIRTYMONTHS: string = 'RECEIVED_GET_VALIDATEHIRTYMONTHS';
const ERROR_GET_VALIDATEHIRTYMONTHS: string = 'ERROR_GET_VALIDATEHIRTYMONTHS';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    isSubmitting: false
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_POST_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isSubmitting: true
            };

        case RECEIVED_POST_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isSubmitting: false,
                data: [...action.payload]
            };

        case ERROR_POST_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isSubmitting: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_PATIENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_TREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_TREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_TREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_COMPLEMENTARYTREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_COMPLEMENTARYTREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_COMPLEMENTARYTREATMENT:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_PHASE:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_PHASE:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_PHASE:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_HEALTHCAREPROVIDER:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_HEALTHCAREPROVIDER:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_HEALTHCAREPROVIDER:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };
            
        case REQUEST_GET_VALIDATEHIRTYMONTHS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_VALIDATEHIRTYMONTHS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_VALIDATEHIRTYMONTHS:
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
function insertPatient(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/Insert';
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
                    request: REQUEST_POST_PATIENT,
                    success: RECEIVED_POST_PATIENT,
                    fail: ERROR_POST_PATIENT
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

function getPatient(cpf: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/Get';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?cpf=${cpf}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATIENT,
                    success: RECEIVED_GET_PATIENT,
                    fail: ERROR_GET_PATIENT
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


function getPatientByName(name: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/GetByName';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?name=${name}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATIENT,
                    success: RECEIVED_GET_PATIENT,
                    fail: ERROR_GET_PATIENT
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

function getPatientByScheduleCode(scheduleCode: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/GetByScheduleCode';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?scheduleCode=${scheduleCode}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATIENT,
                    success: RECEIVED_GET_PATIENT,
                    fail: ERROR_GET_PATIENT
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

function getTreatment() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/ListTreatment';
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
                    request: REQUEST_GET_TREATMENT,
                    success: RECEIVED_GET_TREATMENT,
                    fail: ERROR_GET_TREATMENT
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

function getComplementaryTreatment() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/ListComplementaryTreatment';
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
                    request: REQUEST_GET_COMPLEMENTARYTREATMENT,
                    success: RECEIVED_GET_COMPLEMENTARYTREATMENT,
                    fail: ERROR_GET_COMPLEMENTARYTREATMENT
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

function getPhase() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/ListPhase';
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
                    request: REQUEST_GET_PHASE,
                    success: RECEIVED_GET_PHASE,
                    fail: ERROR_GET_PHASE
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


function getHealthCareProvider() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/ListHealthCareProvider';
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
                    request: REQUEST_GET_PHASE,
                    success: RECEIVED_GET_PHASE,
                    fail: ERROR_GET_PHASE
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


function getValidadeThirtyMonths(cpf: string) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/ValidateCupomThirtyMonths';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?PatientCPF=${cpf}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_VALIDATEHIRTYMONTHS,
                    success: RECEIVED_GET_VALIDATEHIRTYMONTHS,
                    fail: ERROR_GET_VALIDATEHIRTYMONTHS
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

function updatePatient(patient) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'PUT';
        const headers = {};
        const options = {
            data: {...patient}
        };

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATIENT,
                    success: RECEIVED_GET_PATIENT,
                    fail: ERROR_GET_PATIENT
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

function updatePatientIHQPositivo(patient) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Patient/UpdatePatientIHQPositivo';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'PUT';
        const headers = {};
        const options = {
            data: {...patient}
        };

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATIENT,
                    success: RECEIVED_GET_PATIENT,
                    fail: ERROR_GET_PATIENT
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


export function insertPatientIfNeeded(patient: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(insertPatient(patient));
    };
}

export function getPatientIfNeeded(cpf: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldPatient(getState())){
            return dispatch(getPatient(cpf));
        }
        return Promise.resolve();
    };
}

export function getPatientByNameIfNeeded(name: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldPatient(getState())){
            return dispatch(getPatientByName(name));
        }
        return Promise.resolve();
    };
}

export function getPatientByScheduleCodeIfNeeded(scheduleCode: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldPatient(getState())){
            return dispatch(getPatientByScheduleCode(scheduleCode));
        }
        return Promise.resolve();
    };
}


export function getTreatmentIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getTreatment());
    };
}

export function getComplementaryTreatmentIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getComplementaryTreatment());
    };
}

export function getPhaseIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getPhase());
    };
}

export function getHealthCareProviderIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getHealthCareProvider());
    };
}

export function getValidadeThirtyMonthsIfNeeded(cpf: string): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getValidadeThirtyMonths(cpf));
    };
}

export function updatePatientIfNeeded(patient): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldPatient(getState())){
            return dispatch(updatePatient(patient));
        }
        return Promise.resolve();
    };
}

export function updatePatientIHQPositivoIfNeeded(patient): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if(shouldPatient(getState())){
            return dispatch(updatePatientIHQPositivo(patient));
        }
        return Promise.resolve();
    };
}

function shouldPatient(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}