// @flow

import { AUTHORIZATION_STATUS_IN, AUTHORIZATION_STATUS_OUT } from "../actions/setAuthStatus";

type setAuthStatusIn = {
  type: AUTHORIZATION_STATUS_IN,
  payload: any
}

type setAuthStatusOut = {
  type: AUTHORIZATION_STATUS_OUT
}

export type setAuthStatusAction =
  | setAuthStatusIn
  | setAuthStatusOut
