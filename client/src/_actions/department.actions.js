// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { departmentConstants } from "../_constants";
import { departmentService } from "../_services";

export const departmentActions = {
  getAll,
  search,
};


function getAll() {
  return dispatch => {
    dispatch(request());

    departmentService.getAll()
      .then(
        departments => {
          dispatch(success(departments))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: departmentConstants.GETALL_REQUEST } }
  function success(departments) { return { type: departmentConstants.GETALL_SUCCESS, departments } }
  function failure(error) { return { type: departmentConstants.GETALL_FAILURE, error } }
}


// @TODO: merge this with search by type and getAll functions
function search(search_value) {
  return dispatch => {
    dispatch(request());

    departmentService.search(search_value)
      .then(
        departments => {
          dispatch(success(departments))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: departmentConstants.GETALL_REQUEST } }
  function success(departments) { return { type: departmentConstants.GETALL_SUCCESS, departments } }
  function failure(error) { return { type: departmentConstants.GETALL_FAILURE, error } }
}
