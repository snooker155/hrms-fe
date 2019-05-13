// @flow

import { authConstants } from '../_constants';

const initialState = {
  loggedIn: null,
  user: null,
  loggingIn: false,
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
        error: action.error,
      };
    case authConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null,
        loggingIn: false,
      };
    case authConstants.NOT_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.isLoggedIn,
        loggingIn: false,
      };
    case authConstants.IS_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.isLoggedIn,
        loggingIn: false,
      };
    case authConstants.CURRENT_USER_REQUEST:
      return {
        ...state,
      };
    case authConstants.CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case authConstants.CURRENT_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}
