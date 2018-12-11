// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { employeeConstants } from "../_constants";
import { employeeService } from "../_services";

export const employeeActions = {
  getAll,
  getByUsername,
};

function getAll() {
  return dispatch => {
    dispatch(request());

    employeeService.getAll()
      .then(
        users => {
          dispatch(success(users))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.GETALL_REQUEST } }
  function success(users) { return { type: employeeConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: employeeConstants.GETALL_FAILURE, error } }
}

function getByUsername(username: string) {
  return dispatch => {
    dispatch(request(username));

    employeeService.getByUsername(username)
      .then(
        employee => {
          dispatch(success(employee))
        },
        error => {
          dispatch(failure(username, error.toString()))
        }
      );
  };

  function request(username) { return { type: employeeConstants.GETBYID_REQUEST, username } }
  function success(employee) { return { type: employeeConstants.GETBYID_SUCCESS, employee } }
  function failure(username, error) { return { type: employeeConstants.GETBYID_FAILURE, username, error } }
}
