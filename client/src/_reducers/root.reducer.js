// @flow

import { combineReducers } from 'redux';
import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer
});
