// @flow

import { environment } from '../_environments/environment';
import { authHeader } from '../_helpers';
import { authService } from "./auth.service";

export const skillService = {
  getAll,
  getSkillsTypes,
  getByType,
  // update
};

function getAll() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/skills`, requestOptions).then(handleResponse);
}

function getSkillsTypes() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/skills/types`, requestOptions).then(handleResponse);
}

function getByType(skillType: string) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authHeader());
  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  return fetch(`${environment.apiUrl}/skills/${skillType}`, requestOptions).then(handleResponse);
}

// function update(employee: any) {
//   const { skills: skills } = employee;
//   console.log(skills);
//   const myHeaders = new Headers();
//   myHeaders.append("Authorization", authHeader());
//   myHeaders.append("Content-type", "application/json");
//   const requestOptions = {
//     method: 'PUT',
//     headers: myHeaders,
//     body: JSON.stringify({skills: skills})
//   };
//
//   return fetch(`${environment.apiUrl}/users/${employee.attributes.login}`, requestOptions).then(handleResponse);
// }

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