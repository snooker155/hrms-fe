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
    default:
      return state
  }
}
