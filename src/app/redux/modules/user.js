// @flow weak

import moment from 'moment';
import { appConfig } from '../../config';
import userInfosMockData from '../../mock/userInfosMock.json';
import getLocationOrigin from '../../services/utils/getLocationOrigin';
import auth from '../../services/auth';



// --------------------------------
// CONSTANTS
// --------------------------------

const REQUEST_UPDATE_USER:      string = 'REQUEST_UPDATE_USER';
const RECEIVED_UPDATE_USER:     string = 'RECEIVED_UPDATE_USER';
const ERROR_UPDATE_USER:        string = 'ERROR_UPDATE_USER';

const REQUEST_GET_USER:         string = 'REQUEST_GET_USER';
const RECEIVED_GET_USER:        string = 'RECEIVED_GET_USER';
const ERROR_GET_USER:           string = 'ERROR_GET_USER';


const initialState = {
    // actions details
    isFetching: false,
    isLogging: false,
    time: '',

    userInfo:{
        Id: '',
        Name:'',
        Login: '',
        UserType:'',
        Email:'',
        Password:'',
        PasswordConfirmation:''
    }
  };

  export default function (state = initialState, action) {
    const currentTime = moment().format();
  
    switch (action.type) {
        case REQUEST_UPDATE_USER:
        return {
          ...state,
          actionTime: currentTime,
          isFetching: true
        };
  
      case RECEIVED_UPDATE_USER:
        return {
          ...state,
          actionTime: currentTime,
          isFetching: false,
          data: [...action.payload]
        };
  
      case ERROR_UPDATE_USER:
        return {
          ...state,
          actionTime: currentTime,
          isFetching: false,
          error: action.error ? { ...action.error } : {}
        };
  
        
        case REQUEST_GET_USER:
        return {
          ...state,
          actionTime: currentTime,
          isFetching: true
        };
  
      case RECEIVED_GET_USER:
        return {
          ...state,
          actionTime: currentTime,
          isFetching: false,
          data: [...action.payload]
        };
  
      case ERROR_GET_USER:
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

  
function UpdateUser(data: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = 'api/User/UpdateUser';
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
                //common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_UPDATE_USER,
                    success: RECEIVED_UPDATE_USER,
                    fail: ERROR_UPDATE_USER
                },
                //mock fetch props:
                mockResult,
                //real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
  }
  
  export function UpdateUserIfNeeded(user: object): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
            return dispatch(UpdateUser(user));
    };
  }
  
  
  function GetUser(usuCod: any, type: any) {
    return async (dispatch) => {
        const FETCH_TYPE = 'FETCH';
        const __SOME_LOGIN_API__ = `api/User/GetInfoUser?usuCod=${usuCod}&type=${type}`;
        const mockResult = null;
        const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
        const method = 'get';
        const headers = {};
        const options = {};
  
        return dispatch({
            type: 'FETCH_MIDDLEWARE',
            fetch: {
                //common props:
                type: FETCH_TYPE,
                actionTypes: {
                    request: REQUEST_GET_USER,
                    success: RECEIVED_GET_USER,
                    fail: ERROR_GET_USER
                },
                //mock fetch props:
                mockResult,
                //real fetch props:
                url,
                method,
                headers,
                options
            }
        });
    };
  }
  
 
  export function GetUserIfNeeded(usuCod : int, type: int ): (...any) => Promise<any> {
    return (dispatch: (any) => any, getState: () => boolean): any => {
      if (shouldFetchUserInfoData(getState())) {
        return dispatch(GetUser(usuCod, type ));
      }
      return Promise.resolve();
    };
  }
 
  function shouldFetchUserInfoData(state): boolean {
    if (state.isFetching) {
      return false;
    }
    return true;
  }