// @flow

import { authConstants } from '../_constants';

// let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  loggedIn: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user_id: action.user.user
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
      };
    case authConstants.ISLOGGEDIN:
      return {
        loggedIn: action.isLoggedIn,
        loggingIn: false,
        userId: action.userId
      };
    default:
      return state
  }
}
