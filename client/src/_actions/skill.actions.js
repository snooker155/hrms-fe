// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import {projectConstants, skillConstants} from "../_constants";
import {projectService, skillService} from "../_services";

export const skillActions = {
  getAll,
  getSkillsTypes,
  getByType,
  search,
  getById,
  create,
  // update,
  // delete: _delete,
};


function getAll(limit = 7, page = 1) {
  return dispatch => {
    dispatch(request());

    skillService.getAll(limit, page)
      .then(
        skills => {
          dispatch(success(skills))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: skillConstants.GETALL_REQUEST } }
  function success(skills) { return { type: skillConstants.GETALL_SUCCESS, skills } }
  function failure(error) { return { type: skillConstants.GETALL_FAILURE, error } }
}


// @TODO: merge this with search by type and getAll functions
function search(search_value, limit = 7, page = 1) {
  return dispatch => {
    dispatch(request());

    skillService.search(search_value, limit, page)
      .then(
        skills => {
          dispatch(success(skills))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: skillConstants.GETALL_REQUEST } }
  function success(skills) { return { type: skillConstants.GETALL_SUCCESS, skills } }
  function failure(error) { return { type: skillConstants.GETALL_FAILURE, error } }
}

// @TODO: merge this with search and getAll functions
function getSkillsTypes() {
  return dispatch => {
    dispatch(request());

    skillService.getSkillsTypes()
      .then(
        skills => {
          dispatch(success(skills))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: skillConstants.GETALL_SKILLS_TYPES_REQUEST } }
  function success(skillsTypes) { return { type: skillConstants.GETALL_SKILLS_TYPES_SUCCESS, skillsTypes } }
  function failure(error) { return { type: skillConstants.GETALL_SKILLS_TYPES_FAILURE, error } }
}

function getByType(skillType: string, limit, page) {
  return dispatch => {
    dispatch(request(skillType));

    skillService.getByType(skillType, limit, page)
      .then(
        skills => {
          dispatch(success(skills))
        },
        error => {
          dispatch(failure(skillType, error.toString()))
        }
      );
  };

  function request(skillType) { return { type: skillConstants.GETBYTYPE_REQUEST, skillType } }
  function success(skills) { return { type: skillConstants.GETBYTYPE_SUCCESS, skills } }
  function failure(skillType, error) { return { type: skillConstants.GETBYTYPE_FAILURE, skillType, error } }
}

function getById(id: string) {
  return dispatch => {
    dispatch(request(id));

    skillService.getById(id)
      .then(
        skill => {
          dispatch(success(skill))
        },
        error => {
          dispatch(failure(id, error.toString()))
        }
      );
  };

  function request(id) { return { type: skillConstants.GETBYID_REQUEST, id } }
  function success(skill) { return { type: skillConstants.GETBYID_SUCCESS, skill } }
  function failure(id, error) { return { type: skillConstants.GETBYID_FAILURE, id, error } }
}

function create(newSkill) {
  return dispatch => {
    dispatch(request());
    console.log(newSkill);

    skillService.create(newSkill)
      .then(
        skills => {
          console.log(skills);
          dispatch(success(skills))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      );
  };

  function request() { return { type: skillConstants.CREATE_SKILL_REQUEST } }
  function success(skills) { return { type: skillConstants.CREATE_SKILL_SUCCESS, skills } }
  function failure(error) { return { type: skillConstants.CREATE_SKILL_FAILURE, error } }
}

// function update(employee) {
//   return dispatch => {
//     dispatch(request());
//     console.log(employee);
//
//     employeeService.update(employee)
//       .then(
//         employee => {
//           console.log(employee);
//           dispatch(success(employee))
//         },
//         error => {
//           dispatch(failure(error.toString()))
//         }
//       );
//   };
//
//   function request() { return { type: skillConstants.UPDATE_SKILL_REQUEST } }
//   function success(employee) { return { type: skillConstants.UPDATE_SKILL_SUCCESS, employee } }
//   function failure(error) { return { type: skillConstants.UPDATE_SKILL_FAILURE, error } }
// }
//
// function _delete(employee) {
//   return dispatch => {
//     dispatch(request());
//     console.log(employee);
//
//     employeeService.update(employee)
//       .then(
//         employee => {
//           console.log(employee);
//           dispatch(success(employee))
//         },
//         error => {
//           dispatch(failure(error.toString()))
//         }
//       );
//   };
//
//   function request() { return { type: skillConstants.DELETE_SKILL_REQUEST } }
//   function success(employee) { return { type: skillConstants.DELETE_SKILL_SUCCESS, employee } }
//   function failure(error) { return { type: skillConstants.DELETE_SKILL_FAILURE, error } }
// }
