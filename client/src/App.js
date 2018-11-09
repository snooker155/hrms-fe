import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchEmployeesBegin, fetchEmployeesSuccess, fetchEmployeesFailure } from './actions/fetchEmployees';
import { fetchProjectsBegin, fetchProjectsSuccess, fetchProjectsFailure } from './actions/fetchProjects';
import { fetchSkillsBegin, fetchSkillsSuccess, fetchSkillsFailure } from './actions/fetchSkills';
import { setAuthStatusIn, setAuthStatusOut } from './actions/setAuthStatus';

import Spinner from 'react-spinner-material';
import Dashboard from './containers/Dashboard';
import Auth from './containers/Auth';

class App extends Component {
  static propTypes = {
    fetchEmployees: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchSkills: PropTypes.func.isRequired,
    setAuthStatusIn: PropTypes.func.isRequired,
    setAuthStatusOut: PropTypes.func.isRequired,
    employees: PropTypes.shape({
      status: PropTypes.string.isRequired
    }),
    projects: PropTypes.shape({
      status: PropTypes.string.isRequired
    }),
    skills: PropTypes.shape({
      status: PropTypes.string.isRequired
    }),
    user: PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    })
  }

  componentDidMount() {
    const { fetchEmployees, fetchProjects, fetchSkills, setAuthStatusIn, setAuthStatusOut } = this.props;
    fetchEmployees();
    fetchProjects();
    fetchSkills();
    checkCookies(setAuthStatusIn, setAuthStatusOut);
  }

  render() {
    const { isLoggedIn } = this.props.user;

    const statuses = [ this.props.employees.status, this.props.projects.status, this.props.skills.status ];
    const isDataLoaded = statuses.every(status => status === 'fetched');

    // TODO: Добавить в метод render логику для отрисовки ошибок, возникших при обращении к API...
    const isErrorOccured =  statuses.some(status => status === 'error');

    return (
      <>
        { !isDataLoaded
          ? <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
              <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
            </div>
          : isErrorOccured
            ? null
            : isLoggedIn
              ? <Dashboard />
              : <Auth />
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  employees: {
    status: state.employees.employees.status,
  },
  projects: {
    status: state.projects.projects.status,
  },
  skills: {
    status: state.skills.skills.status,
  },
  user: {
    isLoggedIn: state.user.user.isLoggedIn,
  }
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees:  () => { fetchRest(dispatch, '/rest/employees', fetchEmployeesBegin, fetchEmployeesSuccess, fetchEmployeesFailure) },
  fetchProjects:  () => { fetchRest(dispatch, '/rest/projects', fetchProjectsBegin, fetchProjectsSuccess, fetchProjectsFailure) },
  fetchSkills: () => { fetchRest(dispatch, '/rest/skills', fetchSkillsBegin, fetchSkillsSuccess, fetchSkillsFailure )},
  setAuthStatusIn: (cookies) => { dispatch(setAuthStatusIn(cookies)); },
  setAuthStatusOut: () => { dispatch(setAuthStatusOut()); }
});

/* Very useful functions (nope) */
function fetchRest(dispatch, restPath, fetchBegin, fetchSuccess, fetchFailure) {
  dispatch(fetchBegin());
  fetch(restPath)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(json => {
      dispatch(fetchSuccess(json));
    })
    .catch(error => dispatch(fetchFailure(error)));
}

function checkCookies(setLoggedIn, setLoggedOut) {
  // FIXME: Валидация cookies, на основе пары login:password
  const user = {
    id: Number(getCookie('id')),
    login: getCookie('login'),
    password: getCookie('password'),
    name: getCookie('name'),
    surname: getCookie('surname'),
    gender: getCookie('gender')
  };

  for (let key in user) {
    if (user[key] === '') {
      return setLoggedOut();
    }
  }
  return setLoggedIn(user);
}

function getCookie(cookiesName) {
  const name = cookiesName + '=';
  const ca = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
/* </> */

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
