// @flow weak

import fakeModuleWithFetch from './fakeModuleWithFetch';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import views from './views';
import userAuth from './userAuth';
import cities from './cities';
import states from './states';
import vouchers from './vouchers';
import physician from './physician';
import healthUnit from './healthUnit';
import exam from './exam';
import kit from './kit';
import address from './address';
import user from './user';
import patient from './patient';
import mobile from './mobile';
import institution from './institution';

export const reducers = {
  views,
  fakeModuleWithFetch,
  userAuth,
  cities,
  states,
  vouchers,
  physician: physician,
  healthUnit: healthUnit,
  exam,
  kit,
  address,
  user,
  patient,
  mobile,
  institution
};

export default combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer
});
