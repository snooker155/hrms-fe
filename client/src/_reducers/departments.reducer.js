// @flow

import { departmentConstants } from '../_constants';

const initialState = {
  loading: false,
  departments: [],
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
    default:
      return state
  }
}
