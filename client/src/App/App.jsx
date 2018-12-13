// @flow

import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import {alertActions, authActions} from '../_actions';
import { PrivateRoute } from '../_components';
import { Auth } from '../Auth';
import Dashboard from "../Dashboard";
import Spinner from "react-spinner-material";

type AppProps = {|
  alert: () => void,
  alertClearAction: any,
  loggedIn: boolean,
  isLoggedIn: any,
  // user: any,
|};

class App extends Component<AppProps> {
  constructor(props) {
    super(props);

    // const { alertClearAction } = this.props;
    // history.listen(() => {
    //   // clear alert on location change
    //   alertClearAction();
    // });
  }

  componentDidMount(): void {
    const { isLoggedIn } = this.props;
    setTimeout(() => { isLoggedIn() }, 1000);
    // isLoggedIn();
  }

  render() {
    // const { alert } = this.props;
    const { loggedIn } = this.props;

    if ( loggedIn === null ) {
        return (
          <div style={ { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' } }>
            <Spinner size={ 80 } spinnerColor={ '#233242' } spinnerWidth={ 6 } visible={ true } />
          </div>
        )
    }

    return (
            // {alert.message &&
            // <div className={`alert ${alert.type}`}>{alert.message}</div>
            // }
      <>
            <Router history={history}>
              <div>
                <Switch>
                  <Route exact path="/auth/login" component={Auth}/>
                  <PrivateRoute loggedIn={loggedIn} component={Dashboard}/>
                </Switch>
              </div>
            </Router>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    // alert: state.alert,
    loggedIn: state.auth.loggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    alertClearAction: () => dispatch(alertActions.clear()),
    isLoggedIn: () => dispatch(authActions.isLoggedIn()),
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
