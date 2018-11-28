import { AUTHORIZATION_STATUS_IN, AUTHORIZATION_STATUS_OUT } from "../_constants";

export const setAuthStatusIn = cookies => ({
  type: AUTHORIZATION_STATUS_IN,
  payload: cookies
});

export const setAuthStatusOut = () => ({
  type: AUTHORIZATION_STATUS_OUT
});
