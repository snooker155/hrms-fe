// @flow

import { skillConstants } from '../_constants';

const initialState = {
  loading: false,
  skills: null,
  skillsTypes: null,
};

export function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case skillConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case skillConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        skills: action.skills
      };
    case skillConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case skillConstants.GETALL_SKILLS_TYPES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case skillConstants.GETALL_SKILLS_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        skillsTypes: action.skillsTypes
      };
    case skillConstants.GETALL_SKILLS_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case skillConstants.GETBYTYPE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case skillConstants.GETBYTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        skills: action.skills
      };
    case skillConstants.GETBYTYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}
