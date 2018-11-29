// @flow

import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
// import { HomePage } from '../HomePage';
import { Auth } from '../Auth';
import Dashboard from "../containers/Dashboard/Dashboard";

type AppProps = {|
  alert: () => void,
  alertClearAction: any
|};

class App extends Component<AppProps> {
  constructor(props) {
    super(props);

    const { alertClearAction } = this.props;
    history.listen(() => {
      // clear alert on location change
      alertClearAction();
    });
  }

  render() {
    // const { alert } = this.props;
    return (
            // {alert.message &&
            // <div className={`alert ${alert.type}`}>{alert.message}</div>
            // }
            <Router history={history}>
              <div>
                <PrivateRoute exact path="/" component={ Dashboard } />
                <Route path="/auth/login" component={ Auth } />
              </div>
            </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

const mapDispatchToProps = dispatch => {
  return {
    alertClearAction: () => dispatch(alertActions.clear()),
  }
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App };
