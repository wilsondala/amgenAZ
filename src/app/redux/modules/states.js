// @flow weak

import moment             from 'moment';
import getLocationOrigin  from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_STATES:        string = 'REQUEST_STATES';
const RECEIVED_STATES:       string = 'RECEIVED_STATES';
const ERROR_STATES:          string = 'ERROR_STATES';

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
  case REQUEST_STATES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: true
    };

  case RECEIVED_STATES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      data:       [...action.payload]
    };

  case ERROR_STATES:
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
function getStatesPos() {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/GetState';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method      = 'post';
    const headers     = {};
    const options     = {};
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_STATES,
          success:  RECEIVED_STATES,
          fail:     ERROR_STATES
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

function getStates() {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/GetStates';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method      = 'get';
    const headers     = {};
    const options     = {};
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_STATES,
          success:  RECEIVED_STATES,
          fail:     ERROR_STATES
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

export function getStatesIfNeeded(): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetStates(getState())) {
      return dispatch(getStates());
    }
    return Promise.resolve();
  };
}

export function getStatesPosIfNeeded(): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetStates(getState())) {
      return dispatch(getStatesPos());
    }
    return Promise.resolve();
  };
}

function shouldGetStates(state: any): boolean {
  const isFetching = state.states.isFetching;
  if (isFetching) {
    return true;
  }
  return true;
}
