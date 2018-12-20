// @flow

import {employeeConstants} from '../_constants';

const initialState = {
  loading: false,
  employee: null,
  employees: null,
  count: null,
};

export function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.employees.employees,
        count: action.employees.count,
      };
    case employeeConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case employeeConstants.SEARCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.SEARCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.employees.employees,
        count: action.employees.count,
      };
    case employeeConstants.SEARCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case employeeConstants.GETALL_EMPLOYEES_NAMES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.GETALL_EMPLOYEES_NAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchNames: action.employeesNames,
      };
    case employeeConstants.GETALL_EMPLOYEES_NAMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case employeeConstants.GETBYID_REQUEST:
      return {
        loading: true
      };
    case employeeConstants.GETBYID_SUCCESS:
      return {
        loading: false,
        employee: action.employee
      };
    case employeeConstants.GETBYID_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    case employeeConstants.UPDATE_SKILL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.employee
      };
    case employeeConstants.UPDATE_SKILL_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    case employeeConstants.DELETE_SKILL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.DELETE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.employee
      };
    case employeeConstants.DELETE_SKILL_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
