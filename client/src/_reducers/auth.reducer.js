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
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
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
    case authConstants.NOT_LOGGED_IN:
      return {
        loggedIn: action.isLoggedIn,
        loggingIn: false,
      };
    case authConstants.CURRENT_USER_REQUEST:
      return {
        loggedIn: action.isLoggedIn,
        loggingIn: false,
      };
    case authConstants.CURRENT_USER_SUCCESS:
      return {
        ...state,
        loggedIn: action.isLoggedIn,
        loggingIn: false,
        user: action.user
      };
    case authConstants.CURRENT_USER_FAILURE:
      return {
        loggedIn: action.isLoggedIn,
        loggingIn: false,
      };
    default:
      return state
  }
}
