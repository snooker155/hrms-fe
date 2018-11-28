import { combineReducers } from 'redux';
import initialData from './fetchData';
import user from './setAuthStatus';
import appStatus from './setAppStatus';

export const rootReducer = combineReducers({
  initialData,
  user,
  appStatus
});
