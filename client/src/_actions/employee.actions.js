// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { employeeConstants } from "../_constants";
import { employeeService } from "../_services";

export const employeeActions = {
  getAll,
  getByUsername,
  update,
  delete: _delete,
  search,
  searchBySkills,
  searchByDepartment,
  searchByProject,
};

function getAll(limit = 12, page = 1) {
  return dispatch => {
    dispatch(request());

    employeeService.getAll(limit, page)
      .then(
        employees => {
          console.log(employees.employees);
          dispatch(success(employees))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.GETALL_REQUEST } }
  function success(employees) { return { type: employeeConstants.GETALL_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.GETALL_FAILURE, error } }
}

function search(value) {
  return dispatch => {
    dispatch(request());

    employeeService.search(value)
      .then(
        employees => {
          console.log(employees);
          dispatch(success(employees))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.SEARCH_EMPLOYEES_REQUEST } }
  function success(employees) { return { type: employeeConstants.SEARCH_EMPLOYEES_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.SEARCH_EMPLOYEES_FAILURE, error } }
}

function searchBySkills(skillsArray) {
  return dispatch => {
    dispatch(request());

    employeeService.searchBySkills(skillsArray)
      .then(
        employees => {
          console.log(employees);
          dispatch(success(employees))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.SEARCH_EMPLOYEES_REQUEST } }
  function success(employees) { return { type: employeeConstants.SEARCH_EMPLOYEES_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.SEARCH_EMPLOYEES_FAILURE, error } }
}

function searchByDepartment(department) {
  return dispatch => {
    dispatch(request());

    employeeService.searchByDepartment(department)
      .then(
        employees => {
          console.log(employees);
          dispatch(success(employees))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.SEARCH_EMPLOYEES_REQUEST } }
  function success(employees) { return { type: employeeConstants.SEARCH_EMPLOYEES_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.SEARCH_EMPLOYEES_FAILURE, error } }
}

function searchByProject(project) {
  return dispatch => {
    dispatch(request());

    employeeService.searchByProject(project)
      .then(
        employees => {
          console.log(employees);
          dispatch(success(employees))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.SEARCH_EMPLOYEES_REQUEST } }
  function success(employees) { return { type: employeeConstants.SEARCH_EMPLOYEES_SUCCESS, employees } }
  function failure(error) { return { type: employeeConstants.SEARCH_EMPLOYEES_FAILURE, error } }
}

function getNames(value) {
  return dispatch => {
    dispatch(request());

    employeeService.getNames(value)
      .then(
        employeesNames => {
          console.log(employeesNames);
          dispatch(success(employeesNames))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.GETALL_EMPLOYEES_NAMES_REQUEST } }
  function success(employeesNames) { return { type: employeeConstants.GETALL_EMPLOYEES_NAMES_SUCCESS, employeesNames } }
  function failure(error) { return { type: employeeConstants.GETALL_EMPLOYEES_NAMES_FAILURE, error } }
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

function update(employee) {
  return dispatch => {
    dispatch(request());
    console.log(employee.skills);

    employeeService.update(employee)
      .then(
        employee => {
          console.log(employee.skills);
          dispatch(success(employee))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: employeeConstants.UPDATE_SKILL_REQUEST } }
  function success(employee) { return { type: employeeConstants.UPDATE_SKILL_SUCCESS, employee } }
  function failure(error) { return { type: employeeConstants.UPDATE_SKILL_FAILURE, error } }
}

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

  function request() { return { type: employeeConstants.DELETE_SKILL_REQUEST } }
  function success(employee) { return { type: employeeConstants.DELETE_SKILL_SUCCESS, employee } }
  function failure(error) { return { type: employeeConstants.DELETE_SKILL_FAILURE, error } }
}
