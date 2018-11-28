// @flow

import type {fetchDataAction} from "../_types/fetchDataAction";
import { FETCH_DATA_BEGIN, FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS } from "../_constants";

export const fetchDataBegin = (start: any): fetchDataAction => ({
  type: FETCH_DATA_BEGIN,
  payload: start
});

export const fetchDataSuccess = (data: any): fetchDataAction => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error: Error): fetchDataAction => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});
