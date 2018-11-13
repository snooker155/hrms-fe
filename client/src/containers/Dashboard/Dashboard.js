import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAuthStatusOut } from '../../actions/setAuthStatus';

import './Dashboard.scss';
import Header from '../../components/Header';
import Employees from '../../components/Employees';

class Dashboard extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    setAuthStatusOut: PropTypes.func.isRequired
  }

  render() {
    const { user: { id }, setAuthStatusOut } = this.props;
    const { employees, projects, skills } = this.props;

    return (
      <div className="Dashboard">
        <Header
          { ...this.props.user }
          setAuthStatusOut={ setAuthStatusOut }
        />

        <main>
          <Switch>
            <Route exact={ true } path='/employee/:id' />
            <Route exact={ true } path='/project/:id' />
            <Route exact={ true } path='/skill/:title' />
            <Route exact={ true } path='/department/:title' />

            <Route exact={ true } path='/dashboard/employees' render={ () => (
              <Employees employees={ employees } projects={ projects } skills={ skills } />
            )} />
            <Route exact={ true } path='/dashboard/projects'/>
            <Route exact={ true } path='/dashboard/technologies' />

            <Route path='*'>
              <Redirect to={ `/employee/${ id }` } />
            </Route>
          </Switch>
        </main>
      </div>
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
