export const FETCH_EMPLOYEES_BEGIN   = 'FETCH_EMPLOYEES_BEGIN';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

export const fetchEmployeesBegin = () => ({
  type: FETCH_EMPLOYEES_BEGIN,
});

export const fetchEmployeesSuccess = employees => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees
});

export const fetchEmployeesFailure = error => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error
});
