import { FETCH_SKILLS_BEGIN, FETCH_SKILLS_SUCCESS, FETCH_SKILLS_FAILURE } from '../actions/fetchSkills';

const initialState = {
  skills: {
    data: [],
    status: '',
    error: null
  }
};

export default function skills(state = initialState, action) {
  switch(action.type) {
    case FETCH_SKILLS_BEGIN:
      return {
        ...state,
        skills: {
          status: 'fetching',
        }
      };

    case FETCH_SKILLS_SUCCESS:
      return {
        ...state,
        skills: {
          data: action.payload,
          status: 'fetched'
        }
      };

    case FETCH_SKILLS_FAILURE:
      return {
        ...state,
        skills: {
          status: 'error',
          error: action.payload
        }
      };

    default:
      return state;
  }
}
