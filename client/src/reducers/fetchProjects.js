import { FETCH_PROJECTS_BEGIN, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE } from '../actions/fetchProjects';

const initialState = {
  projects: {
    data: [],
    status: '',
    error: null
  }
};

export default function projects(state = initialState, action) {
  switch(action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {
        ...state,
        projects: {
          status: 'fetching',
        }
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: {
          data: action.payload,
          status: 'fetched'
        }
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        projects: {
          status: 'error',
          error: action.payload
        }
      };

    default:
      return state;
  }
}
