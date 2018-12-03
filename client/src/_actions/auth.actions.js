// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { authConstants } from "../_constants";
import { alertActions } from "./alert.actions";
import { authService } from "../_services";
import { history } from '../_helpers';

export const authActions = {
  login,
  logout,
  isLoggedIn,
};

function login(username: string, password: string) {
  return dispatch => {
    dispatch(request({ username }));

    //TODO: remove server delay mock
    setTimeout(() => {
      authService.login(username, password)
        .then(user => {
            dispatch(success(user));
            history.push('/');
          },
          error => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        );
    }, 3000);
  };

  function request() { return { type: authConstants.LOGIN_REQUEST } }
  function success() { return { type: authConstants.LOGIN_SUCCESS } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

function isLoggedIn() {
  return dispatch => {
    if (authService.isLoggedIn()) {
      dispatch(request());
      authService.getCurrentUser()
        .then(user => {
            dispatch(success(user));
          }
          , error => {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          });
    } else {
      dispatch(notLoggedIn());
    }
  }

  function notLoggedIn() { return {
    type: authConstants.NOT_LOGGED_IN,
    isLoggedIn: false,
  } }
  function request() { return {
    type: authConstants.CURRENT_USER_REQUEST,
    isLoggedIn: false,
  } }
  function success(user) { return {
    type: authConstants.CURRENT_USER_SUCCESS,
    isLoggedIn: true,
    user: user
  } }
  function failure(error) { return {
    type: authConstants.CURRENT_USER_FAILURE,
    isLoggedIn: false,
    error: error
  } }
}
