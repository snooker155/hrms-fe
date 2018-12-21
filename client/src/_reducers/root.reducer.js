// @flow

import { combineReducers } from 'redux';
import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import { employeesReducer } from "./employees.reducer";
import { skillsReducer } from "./skills.reducer";
import { departmentsReducer } from "./departments.reducer";
import { projectsReducer } from "./projects.reducer";

export const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  employees: employeesReducer,
  skills: skillsReducer,
  departments: departmentsReducer,
  projects: projectsReducer,
});
