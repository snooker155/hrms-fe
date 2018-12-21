// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { projectConstants } from "../_constants";
import { projectService } from "../_services";

export const projectActions = {
  getAll,
  search,
};


function getAll() {
  return dispatch => {
    dispatch(request());

    projectService.getAll()
      .then(
        projects => {
          dispatch(success(projects))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: projectConstants.GETALL_REQUEST } }
  function success(projects) { return { type: projectConstants.GETALL_SUCCESS, projects } }
  function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}


// @TODO: merge this with search by type and getAll functions
function search(search_value) {
  return dispatch => {
    dispatch(request());

    projectService.search(search_value)
      .then(
        projects => {
          dispatch(success(projects))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: projectConstants.GETALL_REQUEST } }
  function success(projects) { return { type: projectConstants.GETALL_SUCCESS, projects } }
  function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}
