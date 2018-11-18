import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAuthStatusOut } from '../../actions/setAuthStatus';
import createDepartmentsArray from '../../utils/createDepartmentsArray';

import Header from '../../components/Header';
import EmployeeCard from '../../components/EmployeeCard';
import ProjectCard from '../../components/ProjectCard';
import TechnologyCard from '../../components/TechnologyCard';
import DepartmentCard from '../../components/DepartmentCard';
import Employees from '../../components/Employees';
import Projects from '../../components/Projects';
import Technologies from '../../components/Technologies';

class Dashboard extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    setAuthStatusOut: PropTypes.func.isRequired
  }

  render() {
    const { user: { id }, setAuthStatusOut, employees, projects, skills } = this.props;
    const departments = createDepartmentsArray(employees, projects);

    return (
      <>
        <Header { ...this.props.user } setAuthStatusOut={ setAuthStatusOut } />

        <Switch>
          <Route exact={ true } path='/employees/:id' render={ () => (
            <EmployeeCard employees={ employees } projects={ projects } currentUserId={ id } />
          )} />
          <Route exact={ true } path='/projects/:id' render={ () => (
            <ProjectCard projects={ projects } currentUserId={ id } />
          )} />
          <Route exact={ true } path='/skills/:title' render={ () => (
            <TechnologyCard employees={ employees } projects={ projects } skills={ skills } />
          )} />
          <Route exact={ true } path='/departments/:title' render={ () => (
            <DepartmentCard departments={ departments } currentUserId={ id } />
          )} />

          <Route exact={ true } path='/employees' render={ () => (
            <Employees employees={ employees } projects={ projects } skills={ skills } />
          )} />
          <Route exact={ true } path='/projects' render={ () => (
            <Projects employees={ employees } projects={ projects } skills={ skills } />
          )}/>
          <Route exact={ true } path='/skills' render={ () => (
            <Technologies projects={ projects } technologies={ skills.filter(skill => skill.type === 'technology') } />
          )} />

          <Route path='*'>
            <Redirect to={ `/employees/${ id }` } />
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.initialData.employees.data,
  projects: state.initialData.projects.data,
  skills: state.initialData.skills.data,
  user: {
    id: state.user.user.id,
    name: state.user.user.name,
    surname: state.user.user.surname,
    gender: state.user.user.gender
  }
});

const mapDispatchToProps = dispatch => ({
  setAuthStatusOut: () => { dispatch(setAuthStatusOut()); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);
