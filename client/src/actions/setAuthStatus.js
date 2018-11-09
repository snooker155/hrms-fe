export const AUTHORIZATION_STATUS_IN = 'AUTHORIZATION_STATUS_IN';
export const AUTHORIZATION_STATUS_OUT = 'AUTHORIZATION_STATUS_OUT';

export const setAuthStatusIn = cookies => ({
  type: AUTHORIZATION_STATUS_IN,
  payload: cookies
});

export const setAuthStatusOut = () => ({
  type: AUTHORIZATION_STATUS_OUT
});
