// @flow

import { ALL_DATA_LOADED, ERROR_OCCURED } from "../actions/setAppStatus";

type allDataLoaded = {
  type: ALL_DATA_LOADED
}

type errorOccured = {
  type: ERROR_OCCURED,
  payload: Error
}

export type setAppStatusAction =
  | allDataLoaded
  | errorOccured
