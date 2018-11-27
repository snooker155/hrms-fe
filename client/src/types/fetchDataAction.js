// @flow

import {FETCH_DATA_BEGIN, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from "../actions/fetchData";

type fetchDataBegin = {
  type: FETCH_DATA_BEGIN,
  payload: Object
}

type fetchDataSuccess = {
  type: FETCH_DATA_SUCCESS,
  payload: Array<any>
}

type fetchDataFailure = {
  type: FETCH_DATA_FAILURE,
  payload: Error
}

export type fetchDataAction =
  | fetchDataBegin
  | fetchDataSuccess
  | fetchDataFailure
