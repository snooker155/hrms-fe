// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { employeeConstants } from "../_constants";
import { employeeService } from "../_services";

export const employeeActions = {
  getAll,
  getById,
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

function getById(id: string) {
  return dispatch => {
    dispatch(request(id));

    employeeService.getById(id)
      .then(
        employee => {
          dispatch(success(employee))
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: employeeConstants.GETBYID_REQUEST, id } }
  function success(employee) { return { type: employeeConstants.GETBYID_SUCCESS, employee } }
  function failure(id, error) { return { type: employeeConstants.GETBYID_FAILURE, id, error } }
}
