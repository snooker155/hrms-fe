// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { authConstants } from "../_constants";
import { alertActions } from "./alert.actions";
import { authService } from "../_services";
import { history } from '../_helpers';

export const authActions = {
  login,
  logout
};

function login(username: string, password: string) {
  return dispatch => {
    dispatch(request({ username }));

    authService.login(username, password)
      .then(user_id => {
          dispatch(success(user_id));
          history.push('/');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
  function success(user_id) { return { type: authConstants.LOGIN_SUCCESS, user_id } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
  authService.logout();
  return { type: authConstants.LOGOUT };
}
