// @flow weak

import moment             from 'moment';
import getLocationOrigin  from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_VOUCHERS:        string = 'REQUEST_VOUCHERS';
const RECEIVED_VOUCHERS:       string = 'RECEIVED_VOUCHERS';
const ERROR_VOUCHERS:          string = 'ERROR_VOUCHERS';

const SUBMIT_VOUCHER:          string = 'SUBMIT_VOUCHER';
const SUBMITED_VOUCHER:        string = 'SUBMITED_VOUCHER';
const ERROR_SUBMIT_VOUCHER:    string = 'ERROR_SUBMIT_VOUCHER';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  isFetching: false,
  isSubmitting: false,
  actionTime: ''
};

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
  case REQUEST_VOUCHERS:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: true
    };

  case RECEIVED_VOUCHERS:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      data:       [...action.payload]
    };

  case ERROR_VOUCHERS:
    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      error:      action.error ? { ...action.error } : {}
    };

  case SUBMIT_VOUCHER:
    return {
      ...state,
      actionTime: currentTime,
      isSubmitting: true
    };

  case SUBMITED_VOUCHER:
    return {
      ...state,
      actionTime: currentTime,
      isSubmitting: false,
      data:       [...action.payload]
    };

  case ERROR_SUBMIT_VOUCHER:
    return {
      ...state,
      actionTime: currentTime,
      isSubmitting: false,
      error:      action.error ? { ...action.error } : {}
    };

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
function getVouchers(voucherParams: any) {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/vouchers/getvouchers';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      data: { ...voucherParams }
    };
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_VOUCHERS,
          success:  RECEIVED_VOUCHERS,
          fail:     ERROR_VOUCHERS
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

function useVoucher(voucherParams: any) {
  return async (dispatch) => {
    const FETCH_TYPE  = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/vouchers/usevoucher';
    const mockResult  = null;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      data: { ...voucherParams }
    };
    
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request:  SUBMIT_VOUCHER,
          success:  SUBMITED_VOUCHER,
          fail:     ERROR_SUBMIT_VOUCHER
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

export function useVoucherIfNeeded(voucherParams: object): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldUseVoucher(getState())) {
      return dispatch(useVoucher(voucherParams));
    }
    return Promise.resolve();
  };
}

export function getVouchersIfNeeded(voucherParams: object): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetVouchers(getState())) {
      return dispatch(getVouchers(voucherParams));
    }
    return Promise.resolve();
  };
}

function shouldUseVoucher(state: any): boolean {
  const isSubmitting = state.vouchers.isSubmitting;
  if (isSubmitting) {
    return false;
  }
  return true;
}

function shouldGetVouchers(state: any): boolean {
  const isFetching = state.vouchers.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}
