// @flow

// import {FETCH_DATA_BEGIN, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from "../actions/fetchData";

type fetchDataBegin = {
  type: string,
  payload: any
}

type fetchDataSuccess = {
  type: string,
  payload: any
}

type fetchDataFailure = {
  type: string,
  payload: any
}

export type fetchDataAction =
  | fetchDataBegin
  | fetchDataSuccess
  | fetchDataFailure
