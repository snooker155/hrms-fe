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

  function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}

function isLoggedIn() {
  return {
    type: authConstants.ISLOGGEDIN,
    isLoggedIn: authService.isLoggedIn(),
    userId: authService.getCurrentUserId()
  }
}
