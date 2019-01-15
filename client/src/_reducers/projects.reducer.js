// @flow

import { projectConstants } from '../_constants';

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
    case projectConstants.GETALL_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.GETALL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.projects.projects,
      };
    case projectConstants.GETALL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case projectConstants.SEARCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.SEARCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.projects.projects,
        count: action.projects.count,
      };
    case projectConstants.SEARCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case projectConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.project
      };
    case projectConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case projectConstants.UPDATE_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.UPDATE_TECHNOLOGIES_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.project
      };
    case projectConstants.UPDATE_TECHNOLOGIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case projectConstants.DELETE_TECHNOLOGIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case projectConstants.DELETE_TECHNOLOGIES_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.project
      };
    case projectConstants.DELETE_TECHNOLOGIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
