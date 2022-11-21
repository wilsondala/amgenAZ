// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import auth from '../../services/auth';


// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_GET_TYPE_EXAM: string = 'REQUEST_GET_TYPE_EXAM';
const RECEIVED_GET_TYPE_EXAM: string = 'RECEIVED_GET_TYPE_EXAM';
const ERROR_GET_TYPE_EXAM: string = 'ERROR_GET_TYPE_EXAM';

const REQUEST_GET_TYPE_LIST_EXAM: string = 'REQUEST_GET_TYPE_LIST_EXAM';
const RECEIVED_GET_TYPE_LIST_EXAM: string = 'RECEIVED_GET_TYPE_LIST_EXAM';
const ERROR_GET_TYPE_LIST_EXAM: string = 'ERROR_GET_TYPE_LIST_EXAM';

const REQUEST_GET_TYPE_TUMOR: string = 'REQUEST_GET_TYPE_TUMOR';
const RECEIVED_GET_TYPE_TUMOR: string = 'RECEIVED_GET_TYPE_TUMOR';
const ERROR_GET_TYPE_TUMOR: string = 'ERROR_GET_TYPE_TUMOR';

const REQUEST_GET_TYPE_LIST_TUMOR: string = 'REQUEST_GET_TYPE_LIST_TUMOR';
const RECEIVED_GET_TYPE_LIST_TUMOR: string = 'RECEIVED_GET_TYPE_LIST_TUMOR';
const ERROR_GET_TYPE_LIST_TUMOR: string = 'ERROR_GET_TYPE_LIST_TUMOR';

const REQUEST_GET_EXAM_STATUS: string = 'REQUEST_GET_EXAM_STATUS';
const RECEIVED_GET_EXAM_STATUS: string = 'RECEIVED_GET_EXAM_STATUS';
const ERROR_GET_EXAM_STATUS: string = 'ERROR_GET_EXAM_STATUS';

const REQUEST_INSERT_EXAM: string = 'REQUEST_INSERT_EXAM';
const RECEIVED_INSERT_EXAM: string = 'RECEIVED_INSERT_EXAM';
const ERROR_INSERT_EXAM: string = 'ERROR_INSERT_EXAM';

const REQUEST_GET_REPORT_REQUEST_EXAM: string = 'REQUEST_GET_REPORT_REQUEST_EXAM';
const RECEIVED_GET_REPORT_REQUEST_EXAM: string = 'RECEIVED_GET_REPORT_REQUEST_EXAM';
const ERROR_GET_REPORT_REQUEST_EXAM: string = 'ERROR_GET_REPORT_REQUEST_EXAM';

const REQUEST_GET_FILE_DOWNLOAD: string = 'REQUEST_GET_FILE_DOWNLOAD';
const RECEIVED_GET_FILE_DOWNLOAD: string = 'RECEIVED_GET_FILE_DOWNLOAD';
const ERROR_GET_FILE_DOWNLOAD: string = 'ERROR_GET_FILE_DOWNLOAD';

const REQUEST_GET_EXAM: string = 'REQUEST_GET_EXAM';
const RECEIVED_GET_EXAM: string = 'RECEIVED_GET_EXAM';
const ERROR_GET_EXAM: string = 'ERROR_GET_EXAM';

const REQUEST_UPDATE_EXAM: string = 'REQUEST_UPDATE_EXAM';
const RECEIVED_UPDATE_EXAM: string = 'RECEIVED_UPDATE_EXAM';
const ERROR_UPDATE_EXAM: string = 'ERROR_UPDATE_EXAM';

const REQUEST_UPDATE_EXAM_DOCS: string = 'REQUEST_UPDATE_EXAM_DOCS';
const RECEIVED_UPDATE_EXAM_DOCS: string = 'RECEIVED_UPDATE_EXAM_DOCS';
const ERROR_UPDATE_EXAM_DOCS: string = 'ERROR_UPDATE_EXAM_DOCS';

const REQUEST_GET_LIST_REQUEST_EXAM_BY_LABORATORY: string = 'REQUEST_GET_LIST_REQUEST_EXAM_BY_LABORATORY';
const RECEIVED_GET_LIST_REQUEST_EXAM_BY_LABORATORY: string = 'RECEIVED_GET_LIST_REQUEST_EXAM_BY_LABORATORY';
const ERROR_GET_LIST_REQUEST_EXAM_BY_LABORATORY: string = 'ERROR_GET_LIST_REQUEST_EXAM_BY_LABORATORY';

const REQUEST_GET_REPORT_COUNT_CLICK: string = 'REQUEST_GET_REPORT_COUNT_CLICK';
const RECEIVED_GET_REPORT_COUNT_CLICK: string = 'RECEIVED_GET_REPORT_COUNT_CLICK';
const ERROR_GET_REPORT_COUNT_CLICK: string = 'ERROR_GET_REPORT_COUNT_CLICK';


const REQUEST_GET_EXCEPTIONS_EXAM: string = 'REQUEST_GET_EXCEPTIONS_EXAM';
const RECEIVED_GET_EXCEPTIONS_EXAM: string = 'RECEIVED_GET_EXCEPTIONS_EXAM';
const ERROR_GET_EXCEPTIONS_EXAM: string = 'ERROR_GET_EXCEPTIONS_EXAM';

const REQUEST_ALTER_TYPE_EXAM: string = 'REQUEST_ALTER_TYPE_EXAM ';
const RECEIVED_ALTER_TYPE_EXAM: string = 'RECEIVED_ALTER_TYPE_EXAM';
const ERROR_ALTER_TYPE_EXAM: string = 'ERROR_ALTER_TYPE_EXAM';

const REQUEST_RETURN_STATUS_EXAM: string = 'REQUEST_RETURN_STATUS_EXAM ';
const RECEIVED_RETURN_STATUS_EXAM: string = 'RECEIVED_RETURN_STATUS_EXAM';
const ERROR_RETURN_STATUS_EXAM: string = 'ERROR_RETURN_STATUS_EXAM';

const REQUEST_INSERT_EXAM_FOUNDATION: string = 'REQUEST_INSERT_EXAM_FOUNDATION';
const RECEIVED_INSERT_EXAM_FOUNDATION: string = 'RECEIVED_INSERT_EXAM_FOUNDATION';
const ERROR_INSERT_EXAM_FOUNDATION: string = 'ERROR_INSERT_EXAM_FOUNDATION';

const REQUEST_INSERT_OBS_EXAM: string = 'REQUEST_INSERT_OBS_EXAM';
const RECEIVED_INSERT_OBS_EXAM: string = 'RECEIVED_INSERT_OBS_EXAM';
const ERROR_INSERT_OBS_EXAM: string = 'ERROR_INSERT_OBS_EXAM';

const REQUEST_GET_COMPLEMENT_EXAM: string = 'REQUEST_GET_COMPLEMENT_EXAM';
const RECEIVED_GET_COMPLEMENT_EXAM: string = 'RECEIVED_GET_COMPLEMENT_EXAM';
const ERROR_GET_COMPLEMENT_EXAM: string = 'ERROR_GET_COMPLEMENT_EXAM';

const REQUEST_GET_REPORT_REQUEST_EXAM_TAT = 'REQUEST_GET_REPORT_REQUEST_EXAM_TAT'
const RECEIVED_GET_REPORT_REQUEST_EXAM_TAT = 'RECEIVED_GET_REPORT_REQUEST_EXAM_TAT'
const ERROR_GET_REPORT_REQUEST_EXAM_TAT = 'ERROR_GET_REPORT_REQUEST_EXAM_TAT'

const REQUEST_ALTER_EXAM: string = 'REQUEST_ALTER_EXAM';
const RECEIVED_ALTER_EXAM: string = 'RECEIVED_ALTER_EXAM';
const ERROR_ALTER_EXAM: string = 'ERROR_ALTER_EXAM';

const REQUEST_GET_PATHOLOGY: string = 'REQUEST_GET_PATHOLOGY';
const RECEIVED_GET_PATHOLOGY: string = 'RECEIVED_GET_PATHOLOGY';
const ERROR_GET_PATHOLOGY: string = 'ERROR_GET_PATHOLOGY';

const REQUEST_GET_EXAM_FOUNDATION: string = 'REQUEST_GET_EXAM_FOUNDATION';
const RECEIVED_GET_EXAM_FOUNDATION: string = 'RECEIVED_GET_EXAM_FOUNDATION';
const ERROR_GET_EXAM_FOUNDATION: string = 'ERROR_GET_EXAM_FOUNDATION';

const  REQUEST_DOWNLOAD_LAUDO: string =  'REQUEST_DOWNLOAD_LAUDO';
const RECEIVED_DOWNLOAD_LAUDO: string = 'RECEIVED_DOWNLOAD_LAUDO';
const    ERROR_DOWNLOAD_LAUDO: string =    'ERROR_DOWNLOAD_LAUDO';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
    actionTime: '',
    isFetching: false,
    isFetchingDownloadLaudo: false,
};

export default function (state = initialState, action) {
    const currentTime = moment().format();

    switch (action.type) {
        case REQUEST_GET_TYPE_EXAM:
        case REQUEST_GET_PATHOLOGY:
        case REQUEST_GET_REPORT_REQUEST_EXAM_TAT:
        case REQUEST_GET_LIST_REQUEST_EXAM_BY_LABORATORY:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case REQUEST_GET_REPORT_COUNT_CLICK:
                return {
                    ...state,
                    actionTime: currentTime,
                    isFetching: true
                };

        case RECEIVED_GET_TYPE_EXAM:
        case RECEIVED_GET_PATHOLOGY:
        case RECEIVED_GET_REPORT_REQUEST_EXAM_TAT:
        case RECEIVED_GET_LIST_REQUEST_EXAM_BY_LABORATORY:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };
        case RECEIVED_GET_REPORT_COUNT_CLICK:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_TYPE_EXAM:
        case ERROR_GET_PATHOLOGY:
        case ERROR_GET_REPORT_REQUEST_EXAM_TAT:
        case ERROR_GET_LIST_REQUEST_EXAM_BY_LABORATORY:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case ERROR_GET_REPORT_COUNT_CLICK:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_ALTER_TYPE_EXAM:
        case REQUEST_GET_TYPE_LIST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_ALTER_TYPE_EXAM:
        case RECEIVED_GET_TYPE_LIST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_ALTER_TYPE_EXAM:
        case ERROR_GET_TYPE_LIST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        // TUMOR
        case REQUEST_GET_TYPE_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_TYPE_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_TYPE_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_TYPE_LIST_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_TYPE_LIST_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_TYPE_LIST_TUMOR:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_REPORT_REQUEST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_REPORT_REQUEST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_REPORT_REQUEST_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_FILE_DOWNLOAD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_FILE_DOWNLOAD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_FILE_DOWNLOAD:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

            
        case REQUEST_GET_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_UPDATE_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_UPDATE_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_UPDATE_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_UPDATE_EXAM_DOCS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_UPDATE_EXAM_DOCS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_UPDATE_EXAM_DOCS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_EXAM_STATUS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_EXAM_STATUS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_EXAM_STATUS:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        
        case REQUEST_ALTER_EXAM:    
        case REQUEST_INSERT_EXAM:
        case REQUEST_INSERT_EXAM_FOUNDATION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_ALTER_EXAM:    
        case RECEIVED_INSERT_EXAM:
        case RECEIVED_INSERT_EXAM_FOUNDATION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_ALTER_EXAM:    
        case ERROR_INSERT_EXAM:
        case ERROR_INSERT_EXAM_FOUNDATION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_GET_EXCEPTIONS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };

        case RECEIVED_GET_EXCEPTIONS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };

        case ERROR_GET_EXCEPTIONS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_INSERT_OBS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: true
            };
        case RECEIVED_INSERT_OBS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };
        case ERROR_INSERT_OBS_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };
        
        case REQUEST_GET_COMPLEMENT_EXAM:
            return {
                    ...state,
                    actionTime: currentTime,
                    isFetching: true
            };
        case RECEIVED_GET_COMPLEMENT_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };
        case ERROR_GET_COMPLEMENT_EXAM:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                error: action.error ? { ...action.error } : {}
            };
        case REQUEST_GET_EXAM_FOUNDATION:
            return {
                    ...state,
                    actionTime: currentTime,
                    isFetching: true
            };
        case RECEIVED_GET_EXAM_FOUNDATION:
            return {
                ...state,
                actionTime: currentTime,
                isFetching: false,
                data: [...action.payload]
            };
        case ERROR_GET_EXAM_FOUNDATION:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingDownloadLaudo: false,
                error: action.error ? { ...action.error } : {}
            };

        case REQUEST_DOWNLOAD_LAUDO:
            return {
                    ...state,
                    actionTime: currentTime,
                    isFetchingDownloadLaudo: true
            };
        case RECEIVED_DOWNLOAD_LAUDO:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingDownloadLaudo: false,
                data: [...action.payload]
            };
        case ERROR_DOWNLOAD_LAUDO:
            return {
                ...state,
                actionTime: currentTime,
                isFetchingDownloadLaudo: false,
                error: action.error ? { ...action.error } : {}
            };
                
            
        default:
            return state;
    }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function getExamType(examId: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetType';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?id=${examId}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_TYPE_EXAM,
                    success: RECEIVED_GET_TYPE_EXAM,
                    fail: ERROR_GET_TYPE_EXAM
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

function getExamTypeList() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetTypeList';
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
                    request: REQUEST_GET_TYPE_LIST_EXAM,
                    success: RECEIVED_GET_TYPE_LIST_EXAM,
                    fail: ERROR_GET_TYPE_LIST_EXAM
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

function getTumorType(tumorTypeId: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Tumor/GetTumorType';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?id=${tumorTypeId}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_TYPE_TUMOR,
                    success: RECEIVED_GET_TYPE_TUMOR,
                    fail: ERROR_GET_TYPE_TUMOR
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

function getTumorTypeList() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Tumor/GetTumorTypeList';
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
                    request: REQUEST_GET_TYPE_LIST_TUMOR,
                    success: RECEIVED_GET_TYPE_LIST_TUMOR,
                    fail: ERROR_GET_TYPE_LIST_TUMOR
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

function getExamFoundationByPatient(patientId) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/exam/getExamFoundationByPatient';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?patientId=${patientId}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_EXAM_FOUNDATION,
                    success: RECEIVED_GET_EXAM_FOUNDATION,
                    fail: ERROR_GET_EXAM_FOUNDATION
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


function getReportRequestExam(tpucode: any, patientName: any, InitialDate: any, FinalDate: any,  patientCode: any, patientCPF: any, ticket, examType: any, xamStatus: any, laboratoryCode: any, physicianCode: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetReportRequestExam';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?InitialDate=${InitialDate}&FinalDate=${FinalDate}&patientCPF=${patientCPF}&patientName=${patientName}&patientCode=${patientCode}&ticket=${ticket}&examType=${examType}&examStatus=${xamStatus}&laboratoryCode=${laboratoryCode}&physicianCode=${physicianCode}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_REPORT_REQUEST_EXAM,
                    success: RECEIVED_GET_REPORT_REQUEST_EXAM,
                    fail: ERROR_GET_REPORT_REQUEST_EXAM
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

function getReportRequestExamBacchi(tpucode: any, InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, patientCPF: any, ticket: any, healthUnit: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetReportRequestExamBacchi';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?&UserType=${tpucode}&InitialDate=${InitialDate}&FinalDate=${FinalDate}&tumorType=${tumorType}&exams=${exams}&examStatus=${examStatus}&physician=${physician}&patientCPF=${patientCPF}&ticket=${ticket}&healthUnit=${healthUnit}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_REPORT_REQUEST_EXAM,
                    success: RECEIVED_GET_REPORT_REQUEST_EXAM,
                    fail: ERROR_GET_REPORT_REQUEST_EXAM
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

function getExceptions(InitialDate: any, FinalDate: any, exams: any, examStatus: any, physician: any, ticket: any, healthUnit: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetExceptions';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?InitialDate=${InitialDate}&FinalDate=${FinalDate}&exams=${exams}&examStatus=${examStatus}&physician=${physician}&ticket=${ticket}&healthUnit=${healthUnit}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_EXCEPTIONS_EXAM,
                    success: RECEIVED_GET_EXCEPTIONS_EXAM,
                    fail: ERROR_GET_EXCEPTIONS_EXAM
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

function getListRequestExamByLaboratory(InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, patientCPF: any, ticket: any, healthUnit: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetListRequestExamByLaboratory';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?InitialDate=${InitialDate}&FinalDate=${FinalDate}&tumorType=${tumorType}&exams=${exams}&examStatus=${examStatus}&physician=${physician}&patientCPF=${patientCPF}&ticket=${ticket}&healthUnit=${healthUnit}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_LIST_REQUEST_EXAM_BY_LABORATORY,
                    success: RECEIVED_GET_LIST_REQUEST_EXAM_BY_LABORATORY,
                    fail: ERROR_GET_LIST_REQUEST_EXAM_BY_LABORATORY
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

function getReportCountClick(InitialDate: any, FinalDate: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/CountClick/GetReportCountClick';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?InitialDate=${InitialDate}&FinalDate=${FinalDate}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_REPORT_COUNT_CLICK,
                    success: RECEIVED_GET_REPORT_COUNT_CLICK,
                    fail: ERROR_GET_REPORT_COUNT_CLICK
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


function fileDownload(PatientId: any, ageCod: any, TlaCod: any, UserCod: any, Type: any) {
    return async (dispatch) => {


        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/getFile';


        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?PatientId=${PatientId}&AgeCod=${ageCod}&TlaCod=${TlaCod}&UserCod=${UserCod}&Type=${Type}`;
        const method = 'get';
        const headers = {};
        const options = {
            // data: { ...data }
        };

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_FILE_DOWNLOAD,
                    success: RECEIVED_GET_FILE_DOWNLOAD,
                    fail: ERROR_GET_FILE_DOWNLOAD
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


function getExam(agecod: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/Get';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?ageCod=${agecod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_EXAM,
                    success: RECEIVED_GET_EXAM,
                    fail: ERROR_GET_EXAM
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

function updateExam(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/Update';
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
                    request: REQUEST_GET_EXAM,
                    success: RECEIVED_GET_EXAM,
                    fail: ERROR_GET_EXAM
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


function updateExamDocs(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/UpdateDocs';
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
                    request: REQUEST_UPDATE_EXAM_DOCS,
                    success: RECEIVED_UPDATE_EXAM_DOCS,
                    fail: ERROR_UPDATE_EXAM_DOCS
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

function insertExamRequest(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/Schedule';
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
                    request: REQUEST_INSERT_EXAM,
                    success: RECEIVED_INSERT_EXAM,
                    fail: ERROR_INSERT_EXAM
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

function getExamStatus() {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetStatusList';
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
                    request: REQUEST_GET_EXAM_STATUS,
                    success: RECEIVED_GET_EXAM_STATUS,
                    fail: ERROR_GET_EXAM_STATUS
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

function getTypeExamsByHealthUnit(usucod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetTypeListByHealthUnit';
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
                    request: REQUEST_GET_TYPE_LIST_EXAM,
                    success: RECEIVED_GET_TYPE_LIST_EXAM,
                    fail: ERROR_GET_TYPE_LIST_EXAM
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

function getTypeExamAcceptByTumor(usucod, tumor) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetTypeExamAcceptByTumor';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usucod=${usucod}&tumor=${tumor}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_TYPE_LIST_EXAM,
                    success: RECEIVED_GET_TYPE_LIST_EXAM,
                    fail: ERROR_GET_TYPE_LIST_EXAM
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

function alterTypeExam(ageCod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/alterTypeExam';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?ageCod=${ageCod}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_ALTER_TYPE_EXAM,
                    success: RECEIVED_ALTER_TYPE_EXAM,
                    fail: ERROR_ALTER_TYPE_EXAM
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


function insertObsExam(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/InsertObsExam';
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
                    request: REQUEST_INSERT_OBS_EXAM,
                    success: RECEIVED_INSERT_OBS_EXAM,
                    fail: ERROR_INSERT_OBS_EXAM
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


function getComplementExam(agecod) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetComplement';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?agecod=${agecod}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_COMPLEMENT_EXAM,
                    success: RECEIVED_GET_COMPLEMENT_EXAM,
                    fail: ERROR_GET_COMPLEMENT_EXAM
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

/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function returnStatusExam(ageCod, userCode) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/ReturnStatusExam';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?ageCod=${ageCod}&userCode=${userCode}`;
        const method = 'PUT';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_RETURN_STATUS_EXAM,
                    success: RECEIVED_RETURN_STATUS_EXAM,
                    fail: ERROR_RETURN_STATUS_EXAM
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
/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


function rehabilitate(id, userCode) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/Rehabilitate';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?id=${id}&userCode=${userCode}`;
        const method = 'PUT';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {

                    request: REQUEST_GET_EXAM,
                    success: RECEIVED_GET_EXAM,
                    fail: ERROR_GET_EXAM
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

function getReportRequestExamTAT(tpucode: any, usuCod: any, InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, patientCPF: any, ticket: any, healthUnit: any, page, rows) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetReportRequestExamTAT';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?&UserType=${tpucode}&UsuCod=${usuCod}&InitialDate=${InitialDate}&FinalDate=${FinalDate}&tumorType=${tumorType}&exams=${exams}&examStatus=${examStatus}&physician=${physician}&patientCPF=${patientCPF}&ticket=${ticket}&healthUnit=${healthUnit}&page=${page}&rows=${rows}`;
        const method = 'GET';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_REPORT_REQUEST_EXAM_TAT,
                    success: RECEIVED_GET_REPORT_REQUEST_EXAM_TAT,
                    fail: ERROR_GET_REPORT_REQUEST_EXAM_TAT
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

function alterExamRequest(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/AlterSchedule';
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
                    request: REQUEST_ALTER_EXAM,
                    success: RECEIVED_ALTER_EXAM,
                    fail: ERROR_ALTER_EXAM
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


function getCIDPathology(codcid: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/Exam/GetCIDPathology';
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?codcid=${codcid}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_PATHOLOGY,
                    success: RECEIVED_GET_PATHOLOGY,
                    fail: ERROR_GET_PATHOLOGY
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


function DownloadLaudo(exlCod: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const mockResult = null;
        const url = `${getLocationOrigin()}/api/Exam/BuscarLaudo/${exlCod}`;
        const method = 'get';
        const headers = {};
        const options = {};

        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                // common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_DOWNLOAD_LAUDO,
                    success: RECEIVED_DOWNLOAD_LAUDO,
                    fail: ERROR_DOWNLOAD_LAUDO
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

export function getCIDPathologyIfNeeded(codcid: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getCIDPathology(codcid));
    };
}

export function getExamTypeIfNeeded(examId: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(getExamType(examId));
        }
        return Promise.resolve();
    };
}

export function getTumorTypeListIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(getTumorTypeList());
        }
        return Promise.resolve();        
    };
}

export function getTumorTypeIfNeeded(tumorTypeId: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(getTumorType(tumorTypeId));
        }
        return Promise.resolve();
    };
}

export function getExamTypeListIfNeeded(): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getExamTypeList());
    };
}

export function getTypeExamsByHealthUnitIfNeeded(usucod): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getTypeExamsByHealthUnit(usucod));
    };
}

export function getReportRequestExamIfNeeded(tpucode: any, patientName: any, InitialDate: any, FinalDate: any, patientCode: any, patientCPF: any, ticket: any, examType: any, examStatus: any, laboratoryCode: any, physicianCode: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getReportRequestExam(tpucode, patientName, InitialDate, FinalDate, patientCode, patientCPF, ticket, examType, examStatus, laboratoryCode, physicianCode));
    };
}

export function getReportRequestExamBacchiIfNeeded(tpucode: any, InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any,  ticket: any, healthUnit: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getReportRequestExamBacchi(tpucode, InitialDate, FinalDate, tumorType, exams, examStatus, physician, patientCPF, ticket, healthUnit));
    };
}

export function getExceptionsIfNeeded(InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, ticket: any, healthUnit: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getExceptions(InitialDate, FinalDate, tumorType, exams, examStatus, physician, ticket, healthUnit));
    };
}

export function fileDownloadIfNeeded(PatientId: any, AgeCod: any, TlaCod: any, UserCod: any, Type: any): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(fileDownload(PatientId, AgeCod, TlaCod, UserCod, Type));
    };
}

export function getExamIfNeeded(agecod: any): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getExam(agecod));
    };
}

export function updateExamIfNeeded(examSchedule: any): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(updateExam(examSchedule));
    };
}

export function updateExamDocsIfNeeded(examSchedule: any): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(updateExamDocs(examSchedule));
    };
}

export function insertObsExamIfNeeded(examSchedule: object): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(insertObsExam(examSchedule));
    };
}

export function getComplementExamIfNeeded(ageCod: any): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getComplementExam(ageCod));
    };
}

export function insertExamRequestIfNeeded(examRequest: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldInsertExamRequest(getState())) {
            return dispatch(insertExamRequest(examRequest));
        }
        return Promise.resolve();
    };
}

export function getExamStatusIfNeeded(): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getExamStatus());
    };
}

export function getListRequestExamByLaboratoryIfNeeded(InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, patientCPF: any, ticket: any, healthUnit: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getListRequestExamByLaboratory(InitialDate, FinalDate, tumorType, exams, examStatus, physician, patientCPF, ticket, healthUnit));
    };
}

//getReportCountClick(InitialDate: any, FinalDate: any)
export function getReportCountClickIfNeeded(InitialDate: any, FinalDate: any): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getReportCountClick(InitialDate, FinalDate));
    };
}


export function getTypeExamAcceptByTumorIfNeeded(usucod, tumor) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getTypeExamAcceptByTumor(usucod, tumor));
    }
}

export function alterTypeExamIfNeeded(agecod) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldInsertExamRequest(getState())) {
            return dispatch(alterTypeExam(agecod));
        }
        return Promise.resolve();
    }
}

export function returnStatusExamIfNeeded(agecod, userCode) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(returnStatusExam(agecod, userCode));
        }
        return Promise.resolve();
    }
}

export function insertExamFoundationRequestIfNeeded(examRequest: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldInsertExamRequest(getState())) {
            return dispatch(insertExamFoundationRequest(examRequest));
        }
        return Promise.resolve();
    };
}

export function rehabilitateExamIfNeeded(id, userCode): (...any) => Promisse<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(rehabilitate(id, userCode));
        }
        return Promise.resolve();
    };
}

export function getReportRequestExamTATIfNeeded(tpucode: any, usuCod: any, InitialDate: any, FinalDate: any, tumorType: any, exams: any, examStatus: any, physician: any, patientCPF: any, ticket: any, healthUnit: any, page, rows): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldGetExam(getState())) {
            return dispatch(getReportRequestExamTAT(tpucode, usuCod, InitialDate, FinalDate, tumorType, exams, examStatus, physician, patientCPF, ticket, healthUnit, page, rows));
        }
        return Promise.resolve();
    };
}

export function alterScheduleIfNeeded(data: object) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(alterExamRequest(data));
    }
}


export function getExamFoundationByPatientIfNeeded(patientId: int) {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        return dispatch(getExamFoundationByPatient(patientId));
    }
}

export function downloadLaudoIfNeeded(exlCod: int): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
        if (shouldDownloadLaudo(getState())) {
            return dispatch(DownloadLaudo(exlCod));
        }
    };
}

function shouldDownloadLaudo(state: any): boolean {
    const isFetchingDownloadLaudo = state.isFetchingDownloadLaudo;
    if (isFetchingDownloadLaudo) {
        return false;
    }
    return true;
}

function shouldGetExam(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}

function shouldInsertExamRequest(state: any): boolean {
    const isFetching = state.isFetching;
    if (isFetching) {
        return false;
    }
    return true;
}