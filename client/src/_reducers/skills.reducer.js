// @flow

import { skillConstants } from '../_constants';

const initialState = {
  loading: false,
  skills: null,
};

export function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case skillConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case skillConstants.GETALL_SUCCESS:
      return {
        loading: false,
        skills: action.skills
      };
    case skillConstants.GETALL_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    case skillConstants.GETBYTYPE_REQUEST:
      return {
        loading: true
      };
    case skillConstants.GETBYTYPE_SUCCESS:
      return {
        loading: false,
        skills: action.skills
      };
    case skillConstants.GETBYTYPE_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
