// @flow weak

import moment from 'moment';
import getLocationOrigin from '../../services/utils/getLocationOrigin';

// --------------------------------
// CONSTANTS
// --------------------------------
const apicep = 'https://holisticus.azimute.med.br/WebService/Azimute/az-service-cep/api/cep'

const REQUEST_ADDRESS: string = 'REQUEST_ADDRESS';
const RECEIVED_ADDRESS: string = 'RECEIVED_ADDRESS';
const ERROR_ADDRESS: string = 'ERROR_ADDRESS';

const REQUEST_CITIES = 'REQUEST_CITIES';
const RECEIVED_CITIES = 'RECEIVED_CITIES';
const ERROR_CITIES = 'ERROR_CITIES';

const REQUEST_ZIPCODE = 'REQUEST_ZIPCODE';
const RECEIVED_ZIPCODE = 'RECEIVED_ZIPCODE';
const ERROR_ZIPCODE = 'ERROR_ZIPCODE';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  isFetching: false,
  actionTime: '',
  // consumer data
  cep: '',
  city: '',
  state: '',
  street: '',
  neighborhood: ''
};

export default function (state = initialState, action) {
  const currentTime = moment().format();

  switch (action.type) {
    case REQUEST_ADDRESS:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: true
      };

    case RECEIVED_ADDRESS:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        data: [...action.payload]
      };

    case ERROR_ADDRESS:
      return {
        ...state,
        actionTime: currentTime,
        isFetching: false,
        error: action.error ? { ...action.error } : {}
      };

      case REQUEST_CITIES:
        return {
            ...state,
            actionTime: currentTime,
            isCityFetching: true
        };

    case RECEIVED_CITIES:
        return {
            ...state,
            actionTime: currentTime,
            isCityFetching: false,
            data: [...action.payload]
        };

    case ERROR_CITIES:
        return {
            ...state,
            actionTime: currentTime,
            isCityFetching: false,
            error: action.error ? { ...action.error } : {}
        };

    case REQUEST_ZIPCODE:
        return {
            ...state,
            actionTime: currentTime,
            isZipCodeFetching: true
        };

    case RECEIVED_ZIPCODE:
        return {
            ...state,
            actionTime: currentTime,
            isZipCodeFetching: false,
            data: [...action.payload]
        };

    case ERROR_ZIPCODE:
        return {
            ...state,
            actionTime: currentTime,
            isZipCodeFetching: false,
            error: action.error ? { ...action.error } : {}
        };

    default:
        return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

function getAddressByCep(zipCode: string) {
  return async (dispatch) => {
    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/getaddressbycep';
    const mockResult = null;
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method = 'get';
    const headers = {};
    const options = {
      data: { zipCode: zipCode }
    };

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_ADDRESS,
          success: RECEIVED_ADDRESS,
          fail: ERROR_ADDRESS
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

function getAddressByUsucod(usuCod: int, userType: int) {
  return async (dispatch) => {
    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/getaddressbyusucod';
    const mockResult = null;
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?usuCod=${usuCod}&userType=${userType}`;
    const method = 'get';
    const headers = {};
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_ADDRESS,
          success: RECEIVED_ADDRESS,
          fail: ERROR_ADDRESS
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
  function getAddressesByUsucod(usuCod: int, userType: int) {
  return async (dispatch) => {
    const FETCH_TYPE = 'FETCH';
    const __SOME_LOGIN_API__ = 'api/address/getaddressesbyusucod';
    const mockResult = null;
    const url = `${getLocationOrigin()}/${__SOME_LOGIN_API__}?code=${usuCod}&userType=${userType}`;
    const method = 'get';
    const headers = {};
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_ADDRESS,
          success: RECEIVED_ADDRESS,
          fail: ERROR_ADDRESS
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

function getCities(uf) {
  return async (dispatch) => {
      const FETCH_TYPE = 'FETCH';
      const mockResult = null;
      const url = `${apicep}/GetCidades?estado=${uf}`;
      const method = 'get';
      const headers = {};
      const options = {};

      return dispatch({
          type: 'FETCH_MIDDLEWARE',
          fetch: {
              // common props:
              type: FETCH_TYPE,
              actionTypes: {
                  request: REQUEST_CITIES,
                  success: RECEIVED_CITIES,
                  fail: ERROR_CITIES
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

function getAddressByZipcode(cep) {
  return async (dispatch) => {
      const FETCH_TYPE = 'FETCH';
      const mockResult = null;
      const url = `${apicep}/GetCep?cep=${cep}`;
      const method = 'get';
      const headers = {};
      const options = {};

      return dispatch({
          type: 'FETCH_MIDDLEWARE',
          fetch: {
              // common props:
              type: FETCH_TYPE,
              actionTypes: {
                  request: REQUEST_ZIPCODE,
                  success: RECEIVED_ZIPCODE,
                  fail: ERROR_ZIPCODE
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

// --------------------------------
// ACTIONS EXPORTED
// --------------------------------

export function getAddressByCepIfNeeded(zipCode: string): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetAddressByCep(getState())) {
      return dispatch(getAddressByCep(zipCode));
    }
    return Promise.resolve();
  };
}

export function getAddressByUsucodIfNeeded(usuCod: int, userType: int): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetAddressByUsucod(getState())) {
      return dispatch(getAddressByUsucod(usuCod, userType));
    }
    return Promise.resolve();
  };
}

export function getAddressesByUsucodIfNeeded(usuCod: int, userType: int): (...any) => Promise<any> {
  return (dispatch: (any) => any, getState: () => boolean): any => {
    if (shouldGetAddressesByUsucod(getState())) {
      return dispatch(getAddressesByUsucod(usuCod, userType));
    }
    return Promise.resolve();
  };
}

export function getCitiesIfNeeded(uf): (...any) => Promise {
  return (dispatch: (any) => any) => {
      return dispatch(getCities(uf));
  };
}

export function getAddressByZipcodeIfNeeded(cep): (...any) => Promise {
  return (dispatch: (any) => any) => {
      return dispatch(getAddressByZipcode(cep));
  }
}

// --------------------------------
// CONTROLS FETCHINGS STATE
// --------------------------------
function shouldGetAddressByCep(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function shouldGetAddressByUsucod(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function shouldGetAddressesByUsucod(state: any): boolean {
  const isFetching = state.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}