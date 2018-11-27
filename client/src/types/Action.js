// @flow

import type {fetchDataAction} from "./fetchDataAction";
import type {setAppStatusAction} from "./setAppStatusAction";
import type {setAuthStatusAction} from "./setAuthStatusAction";

export type Action =
  | fetchDataAction
  | setAppStatusAction
  | setAuthStatusAction
