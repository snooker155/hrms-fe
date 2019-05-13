// @flow

import {departmentConstants} from '../_constants';

const initialState = {
  loading: false,
  departments: [],
  department: null,
};

export function departmentsReducer(state = initialState, action) {
  switch (action.type) {
    case departmentConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case departmentConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        departments: action.departments
      };
    case departmentConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case departmentConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case departmentConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        department: action.department
      };
    case departmentConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
