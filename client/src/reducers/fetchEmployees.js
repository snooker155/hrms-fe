import { FETCH_EMPLOYEES_BEGIN, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_FAILURE } from '../actions/fetchEmployees';

const initialState = {
  employees: {
    data: [],
    status: '',
    error: null
  }
};

export default function employees(state = initialState, action) {
  switch(action.type) {
    case FETCH_EMPLOYEES_BEGIN:
      return {
        ...state,
        employees: {
          status: 'fetching',
        }
      };

    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: {
          data: action.payload,
          status: 'fetched'
        }
      };

    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        employees: {
          status: 'error',
          error: action.payload
        }
      };

    default:
      return state;
  }
}
