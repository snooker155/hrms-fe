import { combineReducers } from 'redux';
import employees from './fetchEmployees';
import projects from './fetchProjects';
import skills from './fetchSkills';
import user from './setAuthStatus';
import dropDown from './changeDropdownVisibility';

export default combineReducers({
  employees,
  projects,
  skills,
  user,
  dropDown
});
