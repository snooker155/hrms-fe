// @flow

import { environment } from '../_environments/environment';
import { authHeader } from '../_helpers';
import { authService } from "./auth.service";

export const employeeService = {
  getAll,
  getById,
  update
};

function getAll() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(employee: any) {
  console.log(employee);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  myHeaders.append("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(employee)
  };

  return fetch(`${environment.apiUrl}/users/${employee._id}`, requestOptions).then(handleResponse);
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
