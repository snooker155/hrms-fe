// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { employeeConstants } from "../_constants";
import { employeeService } from "../_services";

export const employeeActions = {
  getAll,
  getById,
  getCurrentById
};

function getAll() {
  return dispatch => {
    dispatch(request());

    employeeService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: employeeConstants.GETALL_REQUEST } }
  function success(users) { return { type: employeeConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: employeeConstants.GETALL_FAILURE, error } }
}

function getById(id: string) {
  return dispatch => {
    dispatch(request(id));

    employeeService.getById(id)
      .then(
        user => dispatch(success(user)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: employeeConstants.GETBYID_REQUEST, id } }
  function success(user) { return { type: employeeConstants.GETBYID_SUCCESS, user } }
  function failure(id, error) { return { type: employeeConstants.GETBYID_FAILURE, id, error } }
}

function getCurrentById(id: string) {
  return dispatch => {
    dispatch(request(id));

    employeeService.getById(id)
      .then(
        user => dispatch(success(user)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: employeeConstants.GETCURRENTBYID_REQUEST, id } }
  function success(user) { return { type: employeeConstants.GETCURRENTBYID_SUCCESS, user } }
  function failure(id, error) { return { type: employeeConstants.GETCURRENTBYID_FAILURE, id, error } }
}
