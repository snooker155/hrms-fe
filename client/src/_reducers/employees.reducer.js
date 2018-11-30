// @flow

import { employeeConstants } from '../_constants';

const initialState = {
  loading: false,
};

export function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case employeeConstants.GETALL_SUCCESS:
      return {
        items: action.employees
      };
    case employeeConstants.GETALL_FAILURE:
      return {
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
    case employeeConstants.GETCURRENTBYID_REQUEST:
      return {
        loading: true
      };
    case employeeConstants.GETCURRENTBYID_SUCCESS:
      return {
        loading: false,
        currentEmployee: action.user
      };
    case employeeConstants.GETCURRENTBYID_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
