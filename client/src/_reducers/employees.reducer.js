// @flow

import {employeeConstants} from '../_constants';

const initialState = {
  loading: false,
  employee: null,
  employees: null,
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
        employees: action.employees
      };
    case employeeConstants.GETALL_FAILURE:
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
