// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDataBegin, fetchDataSuccess, fetchDataFailure } from './_actions/fetchData';
import { setAuthStatusIn, setAuthStatusOut } from './_actions/setAuthStatus';
import { allDataLoaded, errorOccured } from './_actions/setAppStatus';

import Spinner from 'react-spinner-material';
import Dashboard from './containers/Dashboard';
import Auth from './containers/Auth';

import checkCookies from './_helpers/checkCookies';
import formatEmployeesData from './_helpers/formatEmployeesData';
import formatSkillsData from './_helpers/formatSkillsData';
import formatProjectsData from './_helpers/formatProjectsData';
import type {EmployeeType} from "./components/Employee";

type AppState = {|
  // employees: Array<EmployeeType>,
  // projects: any,
  // skills: any
|};

class App extends Component<any, AppState> {
  // static propTypes = {
  //   fetchDataBegin: PropTypes.func.isRequired,
  //   fetchDataFailure: PropTypes.func.isRequired,
  //   fetchDataSuccess: PropTypes.func.isRequired,
  //   setAuthStatusIn: PropTypes.func.isRequired,
  //   setAuthStatusOut: PropTypes.func.isRequired,
  //   setAllDataLoadedStatus: PropTypes.func.isRequired,
  //   setErrorOccuredStatus: PropTypes.func.isRequired,
  //   employees: PropTypes.shape({
  //     status: PropTypes.string.isRequired
  //   }),
  //   projects: PropTypes.shape({
  //     status: PropTypes.string.isRequired
  //   }),
  //   skills: PropTypes.shape({
  //     status: PropTypes.string.isRequired
  //   }),
  //   user: PropTypes.shape({
  //     isLoggedIn: PropTypes.bool.isRequired
  //   }),
  //   appStatus: PropTypes.shape({
  //     isDataLoaded: PropTypes.bool.isRequired,
  //     isErrorOccured: PropTypes.bool.isRequired,
  //     errorInfo: PropTypes.string
  //   })
  // }
  //
  // componentDidMount() {
  //   const { fetchDataBegin,
  //           fetchDataFailure,
  //           fetchDataSuccess,
  //           setAuthStatusIn,
  //           setAuthStatusOut,
  //           setAllDataLoadedStatus,
  //           setErrorOccuredStatus
  //   } = this.props;
  //
  //   let employees, projects, skills;
  //   fetchDataBegin({ employees: { data: [], status: 'fetching', error: null }});
  //   fetch('/rest/employees').then(response => {
  //     if (response.status !== 200) {
  //       setErrorOccuredStatus(response.status);
  //       fetchDataFailure({ employees: { data: [], status: response.status, error: true }})
  //       return;
  //     }
  //
  //     return response.json();
  //   }).then(data => {
  //     employees = data;
  //     this.setAuthStatus(employees, setAuthStatusIn, setAuthStatusOut)
  //
  //     fetchDataBegin({ projects: { data: [], status: 'fetching', error: null }});
  //     return fetch('/rest/projects');
  //   }).then(response => {
  //     if (response.status !== 200) {
  //       fetchDataSuccess({ employees: { data: employees, status: 'fetched', error: false }});
  //       setErrorOccuredStatus(response.status);
  //       fetchDataFailure({ projects: { data: [], status: response.status, error: true }})
  //       return;
  //     }
  //
  //     return response.json();
  //   }).then(data => {
  //     projects = data;
  //
  //     formatEmployeesData(employees, projects);
  //     fetchDataSuccess({ employees: { data: employees, status: 'fetched', error: false }});
  //
  //     formatProjectsData(projects, employees);
  //     fetchDataSuccess({ projects: { data: projects, status: 'fetched', error: false }});
  //
  //     fetchDataBegin({ skills: { data: [], status: 'fetching', error: null }});
  //     return fetch('/rest/skills');
  //   }).then(response => {
  //     if (response.status !== 200) {
  //       setErrorOccuredStatus(response.status);
  //       fetchDataFailure({ skills: { data: [], status: response.status, error: true }})
  //       return;
  //     }
  //
  //     return response.json();
  //   }).then(data => {
  //     skills = data;
  //
  //     formatSkillsData(skills, projects);
  //     fetchDataSuccess({ skills: { data: skills, status: 'fetched', error: false }});
  //
  //     setAllDataLoadedStatus();
  //   }).catch(error => {
  //     setErrorOccuredStatus(error);
  //   });
  // }
  //
  // setAuthStatus = (employees: Array<any>, setAuthStatusIn: any, setAuthStatusOut: any): void => {
  //   const user = checkCookies(['login', 'password']);
  //   if (user.isValid) {
  //     for (let i = 0; i < employees.length; i++) {
  //       if (employees[i].login === user.login && employees[i].password === user.password) {
  //         return setAuthStatusIn({
  //           id: employees[i].id,
  //           login: employees[i].login,
  //           password: employees[i].password,
  //           name: employees[i].name,
  //           surname: employees[i].surname,
  //           gender: (employees[i].gender === 'male') ? 'men' : 'women'
  //         });
  //       }
  //     }
  //   }
  //   return setAuthStatusOut();
  // };
  //
  // shouldComponentUpdate(nextProps) {
  //   return (nextProps.appStatus.isDataLoaded || nextProps.appStatus.isErrorOccured);
  // }

  render() {
    // const {
    //   user: { isLoggedIn },
    //   appStatus: { isDataLoaded, isErrorOccured }
    // } = this.props;

    /* TODO: Добавить логику для отрисовки ошибок, возникших при обращении к API... */
    // console.log('<App/> render')
    return (
      <>
        {/*{ !isDataLoaded*/}
          {/*? <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>*/}
              {/*<Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />*/}
            {/*</div>*/}
          {/*: isErrorOccured*/}
            {/*? null*/}
            {/*: isLoggedIn*/}
              {/*? <Dashboard />*/}
              {/*: <Auth />*/}
        {/*}*/}
        <Auth />
      </>
    );
  }
}

// const mapStateToProps = state => ({
//   employees: {
//     status: state.initialData.employees.status,
//   },
//   projects: {
//     status: state.initialData.projects.status,
//   },
//   skills: {
//     status: state.initialData.skills.status,
//   },
//   user: {
//     isLoggedIn: state.user.user.isLoggedIn,
//   },
//   appStatus: {
//     isDataLoaded: state.appStatus.isDataLoaded,
//     isErrorOccured: state.appStatus.isErrorOccured,
//     errorInfo: state.appStatus.errorInfo
//   }
// });
//
// const mapDispatchToProps = dispatch => ({
//   fetchDataBegin: (start) => { dispatch(fetchDataBegin(start)); },
//   fetchDataSuccess: (data) => { dispatch(fetchDataSuccess(data)); },
//   fetchDataFailure: (error) => { dispatch(fetchDataFailure(error)); },
//   setAuthStatusIn: (cookies) => { dispatch(setAuthStatusIn(cookies)); },
//   setAuthStatusOut: () => { dispatch(setAuthStatusOut()); },
//   setAllDataLoadedStatus: () => { dispatch(allDataLoaded()); },
//   setErrorOccuredStatus: (error) => { dispatch(errorOccured(error)); }
// });
//
// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
export default App;
