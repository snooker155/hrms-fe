// @flow

import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Auth.scss';
import { LoginForm } from '../LoginForm';
import logo from '../static-assets/img/logo.png';
import { authActions } from "../_actions";

type AuthProps = {|
  loggingIn: boolean,
  loginAction: (username: string, password: string) => void
|};

class Auth extends Component<AuthProps> {
  constructor(props) {
    super(props);

    // reset login status
    authActions.logout();
  }

  render() {
    const { loggingIn, loginAction } = this.props;
    return (
      <div className="Auth">
        <header className="header">
          <div className="wrapper">
            <div className="auth__logotype">
              <img className="logotype__image" src={ logo } alt="HRM-System" />
            </div>
          </div>
        </header>

        <div className="wrapper">
          <Switch>
            <Route exact={ true } path='/auth/login' render={ () => <LoginForm loggingIn={loggingIn} loginAction={loginAction} /> } />
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
  // loggingIn: state.authentication.loggingIn
  loggingIn: state.loggingIn
});

const mapDispatchToProps = dispatch => ({
  loginAction: (username, password) => dispatch(authActions.login(username, password))
});


const connectedAuth = connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Auth);
export {connectedAuth as Auth};
