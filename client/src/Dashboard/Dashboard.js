import React, { Component } from 'react'
// import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { setAuthStatusOut } from '../../_actions/setAuthStatus';
// import createDepartmentsArray from '../../_helpers/createDepartmentsArray';

import Header from '../Header';
// import EmployeeCard from '../EmployeeCard';
// import ProjectCard from '../../components/ProjectCard';
// import TechnologyCard from '../../components/TechnologyCard';
// import DepartmentCard from '../../components/DepartmentCard';
// import Employees from '../../components/Employees';
// import Projects from '../../components/Projects';
// import Technologies from '../../components/Technologies';
import { authActions, employeeActions } from "../_actions";

class Dashboard extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    logoutAction: PropTypes.func.isRequired,
    getCurrentById: PropTypes.func.isRequired,
    currentEmployee: PropTypes.object,
    employeeLoading: PropTypes.boolean,
    // employees: PropTypes.array.isRequired,
    // projects: PropTypes.array.isRequired,
    // skills: PropTypes.array.isRequired,
    // user: PropTypes.shape({
    //   id: PropTypes.number.isRequired
    // }),
    // setAuthStatusOut: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { userId, getCurrentById } = this.props;
    getCurrentById(userId);
  }

  render() {
    const { userId, logoutAction, currentEmployee, employeeLoading } = this.props;
    // const departments = createDepartmentsArray(employees, projects);

    return (
      <>
        { employeeLoading && <em>Loading...</em>}
        { !employeeLoading && <Header userId={ userId } logoutAction={ logoutAction } currentEmployee={ currentEmployee } /> }

        {/*<Switch>*/}
          {/*<Route exact={ true } path='/employees/:user_id' render={ () => (*/}
            {/*<EmployeeCard userId={ userId } />*/}
          {/*)} />*/}

          {/*<Route exact={ true } path='/projects/:id' render={ () => (*/}
            {/*<ProjectCard projects={ projects } currentUserId={ user_id } />*/}
          {/*)} />*/}
          {/*<Route exact={ true } path='/skills/:title' render={ () => (*/}
            {/*<TechnologyCard employees={ employees } projects={ projects } skills={ skills } />*/}
          {/*)} />*/}
          {/*<Route exact={ true } path='/departments/:title' render={ () => (*/}
            {/*<DepartmentCard departments={ departments } currentUserId={ user_id } />*/}
          {/*)} />*/}

          {/*<Route exact={ true } path='/employees' render={ () => (*/}
            {/*<Employees employees={ employees } projects={ projects } skills={ skills } />*/}
          {/*)} />*/}
          {/*<Route exact={ true } path='/projects' render={ () => (*/}
            {/*<Projects employees={ employees } projects={ projects } skills={ skills } />*/}
          {/*)}/>*/}
          {/*<Route exact={ true } path='/skills' render={ () => (*/}
            {/*<Technologies projects={ projects } technologies={ skills.filter(skill => skill.type === 'technology') } />*/}
          {/*)} />*/}

          {/*<Route path='*'>*/}
            {/*<Redirect to={ `/employees/${ userId }` } />*/}
          {/*</Route>*/}
        {/*</Switch>*/}
      </>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  currentEmployee: state.employees.currentEmployee,
  employeeLoading: state.employees.loading
});

const mapDispatchToProps = dispatch => ({
  logoutAction: () => { dispatch(authActions.logout()); },
  getCurrentById: (userId) => { dispatch(employeeActions.getCurrentById(userId)); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);
