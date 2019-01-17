import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { setAuthStatusOut } from '../../_actions/setAuthStatus';
// import createDepartmentsArray from '../../_helpers/createDepartmentsArray';

import Header from '../Header';
import EmployeeCard from '../EmployeeCard';
import Projects from '../Projects';
import { authActions } from "../_actions";
import Spinner from "react-spinner-material";
import Employees from "../Employees";
import ProjectCard from "../ProjectCard";
import Technologies from "../Technologies";
import TechnologyCard from "../TechnologyCard";
import DepartmentCard from "../DepartmentCard";

class Dashboard extends Component {
  static propTypes = {
    logoutAction: PropTypes.func,
    user: PropTypes.object,
    getCurrentUser: PropTypes.func,
    // employees: PropTypes.array.isRequired,
    // projects: PropTypes.array.isRequired,
    // skills: PropTypes.array.isRequired,
    // user: PropTypes.shape({
    //   id: PropTypes.number.isRequired
    // }),
    // setAuthStatusOut: PropTypes.func.isRequired
  };

  componentDidMount(): void {
    const { getCurrentUser } = this.props;
    //TODO: remove server delay mock
    // setTimeout(() => { getCurrentUser() }, 1000);
    getCurrentUser();
  }

  render() {
    const { user, logoutAction } = this.props;
    // const departments = createDepartmentsArray(employees, projects);

    if ( user === null ) {
      return (
        <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
          <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
        </div>
      )
    }

    return (
      <>
        { user && <Header logoutAction={ logoutAction } user={ user } /> }

        { user &&
        <Switch>
          <Route exact={ true } path="/employees/:employeeUsername" component={ EmployeeCard }/>

          <Route exact={ true } path='/projects/:projectId' component={ ProjectCard } />
          <Route exact={ true } path='/skills/:skillId' component={ TechnologyCard } />
          <Route exact={ true } path='/departments/:departmentId' component={ DepartmentCard } />

          <Route exact={ true } path='/employees' component={ Employees }/>
          <Route exact={ true } path='/projects' component={ Projects }/>
          <Route exact={ true } path='/skills' component={ Technologies } />

          <Route path='*'>
            <Redirect to={`/employees/${user.attributes.login}`}/>
          </Route>
        </Switch>
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logoutAction: () => { dispatch(authActions.logout()); },
  getCurrentUser: () => { dispatch(authActions.getCurrentUser()); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);
