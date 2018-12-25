// @flow

import { environment } from '../_environments/environment';
import { authHeader } from '../_helpers';
import { authService } from "./auth.service";

export const employeeService = {
  getAll,
  getNames,
  getByUsername,
  update,
  search,
  searchBySkills,
  searchByDepartment,
  searchByProject,
};

function getAll(limit = 12, page = 1) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?limit=${limit}&page=${page}`, requestOptions).then(handleResponse);
}

function search(value) {
  const search = Object.entries(value).map(([key, val]) => val && `${key}=${encodeURIComponent(val)}`).filter(Boolean).join('&');
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?${search}`, requestOptions).then(handleResponse);
}

function searchBySkills(skillsArray) {
  const myHeaders = new Headers();
  skillsArray = skillsArray && skillsArray.map(skill => skill._id).join(',');
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?skills=${skillsArray}`, requestOptions).then(handleResponse);
}

function searchByDepartment(department) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?department=${department}`, requestOptions).then(handleResponse);
}

function searchByProject(project) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?project=${project}`, requestOptions).then(handleResponse);
}

function getNames(name) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users?search_name=${name}`, requestOptions).then(handleResponse);
}

function getByUsername(username: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/users/${username}`, requestOptions).then(handleResponse);
}

function update(employee: any) {
  const { skills: skills } = employee;
  console.log(skills);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  myHeaders.append("Content-type", "application/json");
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({skills: skills})
  };

  return fetch(`${environment.apiUrl}/users/${employee.attributes.login}`, requestOptions).then(handleResponse);
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
