import { environment } from '../_environments/environment';
import {authHeader} from "../_helpers";

export const authService = {
  userId: getCurrentUserId(),
  login,
  logout,
  isLoggedIn,
  getCurrentUserId,
  getCurrentUser
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${environment.apiUrl}/auth/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user && user.token;
  return !!token;
}

function getCurrentUserId() {
  if(isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.user;
  }

  return null;
}

function getCurrentUser() {
  const userId = authService.userId;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${environment.apiUrl}/users/${userId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
