// @flow

import { environment } from '../_environments/environment';
import { authHeader } from '../_helpers';
import { authService } from "./auth.service";

export const departmentService = {
  getAll,
  search,
  getById,
};

function getAll() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/departments`, requestOptions).then(handleResponse);
}

function search(search_value) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/departments?search_value=${search_value}`, requestOptions).then(handleResponse);
}

function getById(id: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/departments/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        authService.logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
