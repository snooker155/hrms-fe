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

import checkCookies from './additional/checkCookies';
import fetchRest from './additional/fetchRest';

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
    fetchEmployees().then(employees => {
      this.setAuthStatus(employees, setAuthStatusIn, setAuthStatusOut)
    });
    fetchProjects();
    fetchSkills();
  }

  setAuthStatus = (employees, setAuthStatusIn, setAuthStatusOut) => {
    const user = checkCookies(['login', 'password']);
    if (user.isValid) {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].login === user.login && employees[i].password === user.password) {
          return setAuthStatusIn({
            id: employees[i].id,
            login: employees[i].login,
            password: employees[i].password,
            name: employees[i].name,
            surname: employees[i].surname,
            gender: employees[i].gender
          });
        }
      }
    }
    return setAuthStatusOut();
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
  fetchEmployees:  () => {
    return fetchRest(dispatch, '/rest/employees', fetchEmployeesBegin, fetchEmployeesSuccess, fetchEmployeesFailure)
      .then(json => {
        return json;
      });
  },
  fetchProjects:  () => { fetchRest(dispatch, '/rest/projects', fetchProjectsBegin, fetchProjectsSuccess, fetchProjectsFailure) },
  fetchSkills: () => { fetchRest(dispatch, '/rest/skills', fetchSkillsBegin, fetchSkillsSuccess, fetchSkillsFailure )},
  setAuthStatusIn: (cookies) => { dispatch(setAuthStatusIn(cookies)); },
  setAuthStatusOut: () => { dispatch(setAuthStatusOut()); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
