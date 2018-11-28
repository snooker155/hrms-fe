// @flow

import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../_constants';
import type {EmployeeType} from "../components/Employee";
import type {fetchDataAction} from "../_types/fetchDataAction";

type fetchState = {
  employees: Array<EmployeeType>,
  projects: Array<any>,
  skills: Array<any>
}

const initialState = {
  employees: [],
  projects: [],
  skills: []
};

// const initialState = {
//   employees: {
//     data: [],
//     status: '',
//     error: null
//   },
//   projects: {
//     data: [],
//     status: '',
//     error: null
//   },
//   skills: {
//     data: [],
//     status: '',
//     error: null
//   }
// };

export default function initialData(state: fetchState = initialState, action: fetchDataAction): fetchState {
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
