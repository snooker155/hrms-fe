import { AUTHORIZATION_STATUS_IN, AUTHORIZATION_STATUS_OUT } from '../actions/setAuthStatus';

const initialState = {
  user: {
    id: null,
    login:  null,
    password: null,
    name: null,
    surname: null,
    gender: null,
    isLoggedIn: false
  }
};

export default function user(state = initialState, action) {
  switch(action.type) {
    case AUTHORIZATION_STATUS_IN:
      return {
        ...state,
        user: {
          id: action.payload.id,
          login: action.payload.login,
          password: action.payload.password,
          name: action.payload.name,
          surname: action.payload.surname,
          gender: action.payload.gender,
          isLoggedIn: true
        }
      };

    case AUTHORIZATION_STATUS_OUT:
      document.cookie = 'id=; path=/; expires=' + new Date(0).toUTCString();
      document.cookie = 'login=; path=/; expires=' + new Date(0).toUTCString();
      document.cookie = 'password=; path=/; expires=' + new Date(0).toUTCString();
      document.cookie = 'name=; path=/; expires=' + new Date(0).toUTCString();
      document.cookie = 'surname=; path=/; expires=' + new Date(0).toUTCString();
      document.cookie = 'gender=; path=/; expires=' + new Date(0).toUTCString();

      return {
        ...state,
        user: {
          id: null,
          login:  null,
          password: null,
          name: null,
          surname: null,
          gender: null,
          isLoggedIn: false
        }
      };

    default:
      return state;
  }
}
