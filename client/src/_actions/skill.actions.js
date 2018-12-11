// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { skillConstants } from "../_constants";
import { employeeService } from "../_services";

export const skillActions = {
  delete: _delete,
};

function _delete(employee) {
  return dispatch => {
    dispatch(request());
    console.log(employee);

    employeeService.update(employee)
      .then(
        employee => {
          console.log(employee);
          dispatch(success(employee))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: skillConstants.DELETE_SKILL_REQUEST } }
  function success(employee) { return { type: skillConstants.DELETE_SKILL_SUCCESS, employee } }
  function failure(error) { return { type: skillConstants.DELETE_SKILL_FAILURE, error } }
}
