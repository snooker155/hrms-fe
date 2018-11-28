// @flow

import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthStatusIn } from '../../_actions/setAuthStatus';

import './Auth.scss';
import LoginForm from '../../components/LoginForm';
import RecoverForm from '../../components/RecoverForm';
import logo from '../../static-assets/img/logo.png';

type AuthProps = {|
  setAuthStatusIn: () => any
|};

class Auth extends Component<AuthProps> {
  // static propTypes = {
  //   employees: PropTypes.array.isRequired,
  //   setAuthStatusIn: PropTypes.func.isRequired
  // }

  render() {
    return (
      <div className="Auth">
        <header className="header">
          <div className="wrapper">
            <div className="logotype auth__logotype">
              <Link to={ `/auth/login` }>
                <img className="logotype__image" src={ logo } alt="HRM-System" />
              </Link>
            </div>
          </div>
        </header>

        <div className="wrapper">
          <Switch>
            <Route exact={ true } path='/auth/login' render={ () => <LoginForm { ...this.props } /> } />
            {/*<Route exact={ true } path='/auth/recover' render={ () => <RecoverForm /> }/>*/}

            <Route path='*'>
              <Redirect to={ '/auth/login' } />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.initialData.employees.data,
});

const mapDispatchToProps = dispatch => ({
  setAuthStatusIn: (cookies) => { dispatch(setAuthStatusIn(cookies)); }
});


export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Auth);
