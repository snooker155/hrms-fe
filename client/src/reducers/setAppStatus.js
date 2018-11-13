import { ALL_DATA_LOADED, ERROR_OCCURED } from '../actions/setAppStatus';

const initialState = {
  isDataLoaded: false,
  isErrorOccured: false,
  errorInfo: ''
};

export default function appStatus(state = initialState, action) {
  switch(action.type) {
    case ALL_DATA_LOADED:
      return {
        ...state,
        isDataLoaded: true
      };

    case ERROR_OCCURED:
      return {
        ...state,
        isErrorOccured: true,
        errorInfo: action.payload
      };

    default:
      return {
        ...state
      };
  }
}
