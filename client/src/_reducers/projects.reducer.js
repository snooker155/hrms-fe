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
        projects: action.projects
      };
    case projectConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
