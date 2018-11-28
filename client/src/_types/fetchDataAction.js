// @flow

import {FETCH_DATA_BEGIN, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from "../_constants";

type fetchDataBegin = {
  type: typeof FETCH_DATA_BEGIN,
  payload: any
}

type fetchDataSuccess = {
  type: typeof FETCH_DATA_FAILURE,
  payload: any
}

type fetchDataFailure = {
  type: typeof FETCH_DATA_SUCCESS,
  payload: any
}

export type fetchDataAction =
  | fetchDataBegin
  | fetchDataSuccess
  | fetchDataFailure
