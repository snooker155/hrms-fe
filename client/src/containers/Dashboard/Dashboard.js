import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeDropdownVisibility } from '../../actions/changeDropdownVisibility';
import { setAuthStatusOut } from '../../actions/setAuthStatus';

import './Dashboard.scss';
import Header from '../../components/Header';

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    isDropDownVisible: PropTypes.bool.isRequired,
    changeDropdownVisibility: PropTypes.func.isRequired,
    setAuthStatusOut: PropTypes.func.isRequired
  }

  render() {
    const { user: { id }, changeDropdownVisibility, isDropDownVisible, setAuthStatusOut } = this.props;

    return (
      <div className="Dashboard">
        <Header
          { ...this.props.user }
          isDropDownVisible={ isDropDownVisible }
          changeDropdownVisibility={ changeDropdownVisibility }
          setAuthStatusOut={ setAuthStatusOut }
        />

        <main>
          <Switch>
            <Route exact={ true } path='/employee/:id' />
            <Route exact={ true } path='/project/:id' />
            <Route exact={ true } path='/technology/:title' />
            <Route exact={ true } path='/department/:title' />

            <Route exact={ true } path='/dashboard/employees'/>
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
  employees: state.employees.employees.data,
  projects: state.projects.projects.data,
  skills: state.skills.skills.data,
  user: {
    id: state.user.user.id,
    name: state.user.user.name,
    surname: state.user.user.surname,
    gender: state.user.user.gender
  },
  isDropDownVisible: state.dropDown.dropDown.isDropDownVisible
});

const mapDispatchToProps = dispatch => ({
  changeDropdownVisibility: () => { dispatch(changeDropdownVisibility()); },
  setAuthStatusOut: () => { dispatch(setAuthStatusOut()); }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Dashboard);
