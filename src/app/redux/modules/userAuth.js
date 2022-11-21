// @flow weak

import moment from 'moment';
import { appConfig } from '../../config';
import userInfosMockData from '../../mock/userInfosMock.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import auth from '../../services/auth';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_USER_INFOS_DATA: string = 'REQUEST_USER_INFOS_DATA';
const RECEIVED_USER_INFOS_DATA: string = 'RECEIVED_USER_INFOS_DATA';
const ERROR_USER_INFOS_DATA: string = 'ERROR_USER_INFOS_DATA';

const REQUEST_LOG_USER: string = 'REQUEST_LOG_USER';
const RECEIVED_LOG_USER: string = 'RECEIVED_LOG_USER';
const ERROR_LOG_USER: string = 'ERROR_LOG_USER';

const REQUEST_REDEFINE_PASSWORD: string = 'REQUEST_REDEFINE_PASSWORD';
const RECEIVED_REDEFINE_PASSWORD: string = 'RECEIVED_REDEFINE_PASSWORD';
const ERROR_REDEFINE_PASSWORD: string = 'ERROR_REDEFINE_PASSWORD';

const CHECK_IF_USER_IS_AUTHENTICATED = 'CHECK_IF_USER_IS_AUTHENTICATED';

const DISCONNECT_USER = 'DISCONNECT_USER';

const REQUEST_RESET_PASSWORD: string = 'REQUEST_RESET_PASSWORD';
const RECEIVED_RESET_PASSWORD: string = 'RECEIVED_RESET_PASSWORD';
const ERROR_RESET_PASSWORD: string = 'ERROR_RESET_PASSWORD';

const REQUEST_LOGIN_USER: string = 'REQUEST_LOGIN_USER';
const RECEIVED_LOGIN_USER: string = 'RECEIVED_LOGIN_USER';
const ERROR_LOGIN_USER: string = 'ERROR_LOGIN_USER';

const REQUEST_MOBILE_USER: string = 'REQUEST_MOBILE_USER';
const RECEIVED_MOBILE_USER: string = 'RECEIVED_MOBILE_USER';
const ERROR_MOBILE_USER: string = 'ERROR_MOBILE_USER';


// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  // actions details
  isFetching: false,
  isLogging: false,
  time: '',

  // userInfos
  id: '',
  login: '',
  firstname: '',
  lastname: '',
  profile: '',

  token: null,
  isAuthenticated: false   // authentication status (token based auth)
};

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

    case CHECK_IF_USER_IS_AUTHENTICATED:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated: action.isAuthenticated,
        token: action.token || initialState.token,
        id: action.user && action.user.id ? action.user.id : initialState.id,
        login: action.user && action.user.login ? action.user.login : initialState.login,
        firstname: action.user && action.user.firstname ? action.user.firstname : initialState.firstname,
        lastname: action.user && action.user.lastname ? action.user.lastname : initialState.firstname
      };

    case DISCONNECT_USER:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated: false,
        token: initialState.token,
        id: initialState.id,
        login: initialState.login,
        firstname: initialState.firstname,
        lastname: initialState.lastname
      };

    // user login (get token and userInfo)
    case REQUEST_LOG_USER:
      return {
        ...state,
        actionTime: currentTime,
        isLogging: true
      };

    case RECEIVED_LOG_USER:
      const userLogged = action.payload.data;

      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated: true,
        token: userLogged.token,
        id: userLogged.id,
        login: userLogged.login,
        firstname: userLogged.firstname,
        lastname: userLogged.lastname,
        isLogging: false
      };

    case ERROR_LOG_USER:
      return {
        ...state,
        actionTime: currentTime,
        isAuthenticated: false,
        isLogging: false
      };

    // not used right now:
    case REQUEST_USER_INFOS_DATA:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: true
      };

    case RECEIVED_USER_INFOS_DATA:
      const userInfos = action.payload.data;

      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        id: userInfos.id,
        login: userInfos.login,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname
      };

    case ERROR_USER_INFOS_DATA:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false
      };

    case REQUEST_REDEFINE_PASSWORD:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: true
      };

    case RECEIVED_REDEFINE_PASSWORD:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        data: [...action.payload]
      };

    case ERROR_REDEFINE_PASSWORD:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        error: action.error ? { ...action.error } : {}
      };

    case REQUEST_LOGIN_USER:
    case REQUEST_RESET_PASSWORD:
    case REQUEST_MOBILE_USER:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: true
      };

    case RECEIVED_LOGIN_USER:
    case RECEIVED_RESET_PASSWORD:
    case RECEIVED_MOBILE_USER:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        data: [...action.payload]
      };

    case ERROR_LOGIN_USER:
    case ERROR_RESET_PASSWORD:
    case ERROR_MOBILE_USER:
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
//

/**
 *
 * set user isAuthenticated to false and clear all app localstorage:
 *
 * @export
 * @returns {action} action
 */
export function disconnectUser() {
  auth.clearAllAppStorage();
  return { type: DISCONNECT_USER };
}

/**
 * 
 * check if user is connected by looking at locally stored 
 * - token
 * - user fonrmation
 * 
 * @export
 * @returns {action} action 
 */
export function checkUserIsConnected() {
  const token = auth.getToken();
  const user = auth.getUserInfo();
  const checkUserHasId = obj => obj && obj._id;
  const isAuthenticated = (token && checkUserHasId(user)) ? true : false;

  return {
    type: CHECK_IF_USER_IS_AUTHENTICATED,
    token,
    ...user,
    isAuthenticated
  };
}

/**
 *
 *  user login
 *
 * @param {string} login user login
 * @param {string} password usepasswordr 
 * @returns {Promise<any>} promised action
 */
function logUser(login: string, password: string) {
  return async (dispatch) => {
    const FETCH_TYPE = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
    const __SOME_LOGIN_API__ = 'api/authentication/authenticate';
    const mockResult = userInfosMockData; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method = 'POST';
    const headers = {};
    const options = {
      credentials: 'same-origin',
      data: { login, password }
    };

    // fetchMiddleware (does: fetch mock, real fetch, dispatch 3 actions... for a minimum code on action creator!)
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_LOG_USER,
          success: RECEIVED_LOG_USER,
          fail: ERROR_LOG_USER
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

export function logUserIfNeeded(objUser: object): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldLogUser(getState())) {
      return dispatch(logUser(objUser.login, objUser.password));
    }
    return Promise.resolve();
  };
}

function shouldLogUser(state: any): boolean {
  const isLogging = state.userAuth.isLogging;
  if (isLogging) {
    return false;
  }
  return true;
}

/**
 * fetch user info
 *
 * NOTE: this shows a use-case of fetchMiddleware
 *@param {string} [id=''] user id
 * @returns {Promise<any>} returns fetch promise
 */
function fetchUserInfosData(id = '') {
  return dispatch => {
    const token = auth.getToken();
    const FETCH_TYPE = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';

    const mockResult = userInfosMockData; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)
    const url = `${getLocationOrigin()}/${appConfig.API.users}/${id}`;
    const method = 'get';
    const headers = {};
    const options = { credentials: 'same-origin' }; // put options here (see axios options)

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_USER_INFOS_DATA,
          success: RECEIVED_USER_INFOS_DATA,
          fail: ERROR_USER_INFOS_DATA
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

export function fetchUserInfoDataIfNeeded(id: string = '') {
  return (dispatch, getState) => {
    if (shouldFetchUserInfoData(getState())) {
      return dispatch(fetchUserInfosData(id));
    }
    return Promise.resolve();
  };
}

/**
 *
 * determine wether fetching should occur
 *
 * rules:
 * - should not fetch twice when already fetching
 * - ...more rules can be added
 *
 * @param {Immutable.Map} state all redux state (immutable state)
 * @returns {boolean} flag
 */
function shouldFetchUserInfoData(state): boolean {
  const userInfos = state.userAuth;
  if (userInfos.isFetching) {
    return false;
  }
  return true;
}

function redefinePassword(filter: string) {
  return async (dispatch) => {

    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = `api/authentication/redefinepassword?filter=${filter}`;
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
          request: REQUEST_REDEFINE_PASSWORD,
          success: RECEIVED_REDEFINE_PASSWORD,
          fail: ERROR_REDEFINE_PASSWORD
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

export function redefinePasswordIfNeeded(filter: string): (...any) => Promisse<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    return dispatch(redefinePassword(filter));
  };
}

function resetPassword(usucod) {
  return async (dispatch) => {

    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = `api/authentication/resetpassword?usucod=${usucod}`;
    const mockResult = null;
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method = 'PUT';
    const headers = {};
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_RESET_PASSWORD,
          success: RECEIVED_RESET_PASSWORD,
          fail: ERROR_RESET_PASSWORD
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

export function resetPasswordIfNeeded(usucod): (...any) => Promisse<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldFetchUserInfoData(getState())) {
      return dispatch(resetPassword(usucod));
    }
    return Promise.resolve();
  };
}

function login(login, password) {
  return async (dispatch) => {
    const FETCH_TYPE = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
    // const __SOME_LOGIN_API__ = 'infra/auth/1.0.0/usuario/login';
    const __SOME_LOGIN_API__ = 'api/Authentication';
    const mockResult = userInfosMockData; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method = 'POST';
    const headers = {};
    const options = {
      credentials: 'same-origin',
      data: { Login: login, Password: password, GrantType: "password" }
    };

    // fetchMiddleware (does: fetch mock, real fetch, dispatch 3 actions... for a minimum code on action creator!)
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
          // common props:
          type: FETCH_TYPE,
          actionTypes: {
            request: REQUEST_LOG_USER,
            success: RECEIVED_LOG_USER,
            fail: ERROR_LOG_USER
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

export function loginIfNeeded(loginU, password) {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldLogin(getState())) {
      return dispatch(login(loginU, password));
    }
    return Promise.resolve();
  };
}

function shouldLogin(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}