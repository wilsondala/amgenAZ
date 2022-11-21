// @flow weak

import moment             from 'moment';
import getLocationOrigin  from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_STAGES:        string = 'REQUEST_STAGES';
const RECEIVED_STAGES:       string = 'RECEIVED_STAGES';
const ERROR_STAGES:          string = 'ERROR_STAGES';

// --------------------------------
// REDUCER
// --------------------------------
const initialStage = {
  isFetching: false,
  actionTime: ''
};

export default function (state = initialStage, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case REQUEST_STAGES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: true
    };

  case RECEIVED_STAGES:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      data:       [...action.payload]
    };

  case ERROR_STAGES:
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
function getStages() {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/stage/GetStages';
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
          request:  REQUEST_STAGES,
          success:  RECEIVED_STAGES,
          fail:     ERROR_STAGES
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

export function getStagesIfNeeded(): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetStages(getState())) {
      return dispatch(getStages());
    }
    return Promise.resolve();
  };
}

function shouldGetStages(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return true;
  }
  return true;
}
