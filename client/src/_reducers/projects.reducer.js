// @flow

import {employeeConstants, projectConstants} from '../_constants';

const initialState = {
  loading: false,
  projects: null,
};

export function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case projectConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects.projects,
        count: action.projects.count,
      };
    case projectConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case employeeConstants.SEARCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case employeeConstants.SEARCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects.projects,
        count: action.projects.count,
      };
    case employeeConstants.SEARCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
