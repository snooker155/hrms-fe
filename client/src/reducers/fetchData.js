// @flow

import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/fetchData';
import type {EmployeeType} from "../components/Employee";
import type {Action} from "../types";

type State = {
  employees: Array<EmployeeType>,
  projects: Array<any>,
  skills: Array<any>
}

const initialState = {
  employees: {
    data: [],
    status: '',
    error: null
  },
  projects: {
    data: [],
    status: '',
    error: null
  },
  skills: {
    data: [],
    status: '',
    error: null
  }
};

export default function initialData(state: State = initialState, action: Action) {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        ...action.payload
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
