// @flow

// import type {fetchDataAction} from "../_types/fetchDataAction";
import { skillConstants } from "../_constants";
import { skillService } from "../_services/skill.service";

export const skillActions = {
  getAll,
  getSkillsTypes,
  getByType,
  // update,
  // delete: _delete,
};

function getAll() {
  return dispatch => {
    dispatch(request());

    skillService.getAll()
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

function getByType(skillType: string) {
  return dispatch => {
    dispatch(request(skillType));

    skillService.getByType(skillType)
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
