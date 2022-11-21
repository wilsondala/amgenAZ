// @flow weak

import moment             from 'moment';
import getLocationOrigin  from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_CITIES:        string = 'REQUEST_CITIES';
const RECEIVED_CITIES:       string = 'RECEIVED_CITIES';
const ERROR_CITIES:          string = 'ERROR_CITIES';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  isFetching: false,
  actionTime: ''
};

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case REQUEST_CITIES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: true
    };

  case RECEIVED_CITIES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      data:       [...action.payload]
    };

  case ERROR_CITIES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      error:      action.error ? { ...action.error } : {}
    };

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function getCities(state: int) {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/Address/GetCities';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?state=${state}`;
    const method      = 'get';
    const headers     = {};
    const options     = {};
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_CITIES,
          success:  RECEIVED_CITIES,
          fail:     ERROR_CITIES
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

function getCitiesPos(state: string) {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/getcitiespos';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?state=${state}`;
    const method      = 'get';
    const headers     = {};
    const options     = {};
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_CITIES,
          success:  RECEIVED_CITIES,
          fail:     ERROR_CITIES
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

export function getCitiesIfNeeded(state: int): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetCities(getState())) {
      return dispatch(getCities(state));
    }
    return Promise.resolve();
  };
}

export function getCitiesPosIfNeeded(state: string): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetCities(getState())) {
      return dispatch(getCitiesPos(state));
    }
    return Promise.resolve();
  };
}

function shouldGetCities(state: any): boolean {
  const isFetching = state.cities.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}