// @flow

import { environment } from '../_environments/environment';
import { authHeader } from '../_helpers';
import { authService } from "./auth.service";

export const projectService = {
  getAll,
  getAllWithPages,
  search,
  getById,
  update,
};

function getAll() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/projects`, requestOptions).then(handleResponse);
}

function getAllWithPages(limit = 20, page = 1) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/projects?page=${page}&limit=${limit}`, requestOptions).then(handleResponse);
}

function search(value, limit = 20, page = 1) {
  const search = Object.entries(value).map(([key, val]) => val && `${key}=${encodeURIComponent(val)}`).filter(Boolean).join('&');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/projects?limit=${limit}&page=${page}&${search}`, requestOptions).then(handleResponse);
}

function getById(id: number) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/projects/${id}`, requestOptions).then(handleResponse);
}

function update(project: any) {
  const { technologies: technologies } = project;
  console.log(technologies);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  myHeaders.append("Content-type", "application/json");
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({technologies: technologies})
  };

  return fetch(`${environment.apiUrl}/projects/${project.id}`, requestOptions).then(handleResponse);
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
