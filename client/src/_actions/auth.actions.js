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
  getCurrentUser
};

function login(username: string, password: string) {
  return dispatch => {
    dispatch(request({ username }));

    //TODO: remove server delay mock
    // setTimeout(() => {
      authService.login(username, password)
        .then(user => {
            dispatch(success(user));
            history.push('/');
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        );
    // }, 3000);
  };

  function request() { return { type: authConstants.LOGIN_REQUEST } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

function isLoggedIn() {
  return dispatch => {
    if (authService.isLoggedIn()) {
      dispatch(loggedIn());
    } else {
      dispatch(notLoggedIn());
    }
  };

  function notLoggedIn() { return {
    type: authConstants.NOT_LOGGED_IN,
    isLoggedIn: false,
  } }

  function loggedIn() { return {
    type: authConstants.IS_LOGGED_IN,
    isLoggedIn: true,
  } }
}

function getCurrentUser() {
  return dispatch => {
    dispatch(request());

    authService.getCurrentUser()
      .then(user => {
          dispatch(success(user));
        }
        , error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        });
  };

  function request() {
    return {
      type: authConstants.CURRENT_USER_REQUEST,
    }
  }

  function success(user) {
    return {
      type: authConstants.CURRENT_USER_SUCCESS,
      user: user
    }
  }

  function failure(error) {
    return {
      type: authConstants.CURRENT_USER_FAILURE,
      error: error
    }
  }
}
