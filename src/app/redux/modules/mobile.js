import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';


// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_ASSOCIATES_MOBILE_USER: string = 'REQUEST_ASSOCIATES_MOBILE_USER';
const RECEIVED_ASSOCIATES_MOBILE_USER: string = 'RECEIVED_ASSOCIATES_MOBILE_USER';
const ERROR_ASSOCIATES_MOBILE_USER: string = 'ERROR_ASSOCIATES_MOBILE_USER';

const REQUEST_NOTIFY_USER: string = 'REQUEST_NOTIFY_USER';
const RECEIVED_NOTIFY_USER: string = 'RECEIVED_NOTIFY_USER';
const ERROR_NOTIFY_USER: string = 'ERROR_NOTIFY_USER';

const initialState = { actionTime: '', isFetching: false };

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {

    case REQUEST_ASSOCIATES_MOBILE_USER:
    case REQUEST_NOTIFY_USER:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: true
      };

    case RECEIVED_ASSOCIATES_MOBILE_USER:
    case RECEIVED_NOTIFY_USER:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        data: [...action.payload]
      };

    case ERROR_ASSOCIATES_MOBILE_USER:
    case ERROR_NOTIFY_USER:
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
function AssociatesMobileWithUser(mobileId, userId) {
  return async (dispatch) => {
    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/Mobile/AssociatesMobileWithUser';
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?mobileId=${mobileId}&userId=${userId}`;
    const mockResult = null;
    const method = 'POST';
    const headers = {};
    const options = {};
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_ASSOCIATES_MOBILE_USER,
          success: RECEIVED_ASSOCIATES_MOBILE_USER,
          fail: ERROR_ASSOCIATES_MOBILE_USER
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

export function AssociatesMobileWithUserIfNeeded(pushId, userId) {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldMobile(getState())) {
      return dispatch(AssociatesMobileWithUser(pushId, userId));
    }
    return Promise.resolve();
  };
}

function NotifyMobileUser(userId, ticket, statusDescription) {
  return async (dispatch) => {
    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/Mobile/NotifyMobileUser';
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?userId=${userId}&ticket=${ticket}&newStatus=${statusDescription}`;
    const mockResult = null;
    const method = 'POST';
    const headers = {};
    const options = {};

    return dispatch({
      type: 'FETCH_PARTNERT',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_NOTIFY_USER,
          success: RECEIVED_NOTIFY_USER,
          fail: ERROR_NOTIFY_USER
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

export function NotifyMobileUserIfNeeded(userId, ticket, statusDescription) {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldMobile(getState())) {
      return dispatch(NotifyMobileUser(userId, ticket, statusDescription));
    }
    return Promise.resolve();
  };
}

function shouldMobile(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}