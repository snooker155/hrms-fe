import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { setAuthStatusOut } from '../../_actions/setAuthStatus';
// import createDepartmentsArray from '../../_helpers/createDepartmentsArray';

import Header from '../../components/Header';
import EmployeeCard from '../../components/EmployeeCard';
// import ProjectCard from '../../components/ProjectCard';
// import TechnologyCard from '../../components/TechnologyCard';
// import DepartmentCard from '../../components/DepartmentCard';
// import Employees from '../../components/Employees';
// import Projects from '../../components/Projects';
// import Technologies from '../../components/Technologies';
import {authActions} from "../../_actions";

class Dashboard extends Component {
  static propTypes = {
    user_id: PropTypes.string.isRequired,
    logoutAction: PropTypes.func.isRequired
    // employees: PropTypes.array.isRequired,
    // projects: PropTypes.array.isRequired,
    // skills: PropTypes.array.isRequired,
    // user: PropTypes.shape({
    //   id: PropTypes.number.isRequired
    // }),
    // setAuthStatusOut: PropTypes.func.isRequired
  }

  render() {
    const { user_id, logoutAction } = this.props;
    // const departments = createDepartmentsArray(employees, projects);

    return (
      <>
        <Header user_id={ user_id } logoutAction={ logoutAction } />

        <Switch>
          <Route exact={ true } path='/employees/:id' render={ () => (
            <EmployeeCard currentUserId={ user_id } />
          )} />

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

          <Route path='*'>
            <Redirect to={ `/employees/${ user_id }` } />
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user_id
});

const mapDispatchToProps = dispatch => ({
  logoutAction: () => { dispatch(authActions.logout()); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);
