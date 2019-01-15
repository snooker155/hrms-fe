// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import {employeeConstants, projectConstants} from "../_constants";
import {employeeService, projectService} from "../_services";

export const projectActions = {
  getAll,
  getAllWithPages,
  search,
  getById,
  update,
  delete: _delete,
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

  function request() { return { type: projectConstants.GETALL_LIST_REQUEST } }
  function success(projects) { return { type: projectConstants.GETALL_LIST_SUCCESS, projects } }
  function failure(error) { return { type: projectConstants.GETALL_LIST_FAILURE, error } }
}

function getAllWithPages(limit = 20, page = 1) {
  return dispatch => {
    dispatch(request());

    projectService.getAllWithPages(limit, page)
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
function search(search_value, limit = 20, page = 1) {
  return dispatch => {
    dispatch(request());

    projectService.search(search_value, limit, page)
      .then(
        projects => {
          console.log(projects);
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

function getById(id: number) {
  return dispatch => {
    dispatch(request(id));

    projectService.getById(id)
      .then(
        project => {
          dispatch(success(project))
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: projectConstants.GETBYID_REQUEST, id } }
  function success(project) { return { type: projectConstants.GETBYID_SUCCESS, project } }
  function failure(id, error) { return { type: projectConstants.GETBYID_FAILURE, id, error } }
}

function update(project) {
  return dispatch => {
    dispatch(request());
    console.log(project.technologies);

    projectService.update(project)
      .then(
        project => {
          console.log(project.technologies);
          dispatch(success(project))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: projectConstants.UPDATE_TECHNOLOGIES_REQUEST } }
  function success(project) { return { type: projectConstants.UPDATE_TECHNOLOGIES_SUCCESS, project } }
  function failure(error) { return { type: projectConstants.UPDATE_TECHNOLOGIES_FAILURE, error } }
}

function _delete(project) {
  return dispatch => {
    dispatch(request());
    console.log(project);

    projectService.update(project)
      .then(
        project => {
          console.log(project);
          dispatch(success(project))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: projectConstants.DELETE_TECHNOLOGIES_REQUEST } }
  function success(project) { return { type: projectConstants.DELETE_TECHNOLOGIES_SUCCESS, project } }
  function failure(error) { return { type: projectConstants.DELETE_TECHNOLOGIES_FAILURE, error } }
}
