// @flow

import { combineReducers } from 'redux';
import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import { employeesReducer } from "./employees.reducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  employees: employeesReducer
});
