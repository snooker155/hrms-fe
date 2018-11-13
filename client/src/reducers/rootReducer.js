import { combineReducers } from 'redux';
import initialData from './fetchData';
import user from './setAuthStatus';
import appStatus from './setAppStatus';

export default combineReducers({
  initialData,
  user,
  appStatus
});
